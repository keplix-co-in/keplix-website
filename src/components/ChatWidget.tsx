import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../constants/links';

/**
 * Floating "Ask Keplix" assistant. It talks to /api/chat (free-tier Gemini
 * with a Groq fallback) and answers from the Keplix knowledge pack.
 *
 * It renders only after mount, like CookieConsent does, so the prerendered
 * HTML never contains it and hydration can't mismatch.
 */

// Optional Cloudflare Turnstile human check. It is only active when
// VITE_TURNSTILE_SITE_KEY is set; the server must then have
// TURNSTILE_SECRET_KEY too.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const loadTurnstile = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load the human check.'));
    document.head.appendChild(s);
  });

type Msg = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'How do I book a car service?',
  'What is your refund policy?',
  'How much does AC gas refill cost?',
  'How can my garage join Keplix?',
];

const GREETING: Msg = {
  role: 'assistant',
  content: 'Hi! I’m the Keplix assistant. Ask me about booking, prices, refunds or joining as a garage.',
};

// Replies are shown as plain text. The model writes light markdown, so
// [label](url) and bare URLs become links, **bold** becomes <strong>, and
// "* " bullets become "• ". Nothing else is interpreted, and React escapes the
// rest, so model output can never inject markup.
const TOKEN_RE = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+|\*\*[^*]+\*\*)/g;
const linkClass = 'break-all text-brand-red underline';
const renderText = (text: string) =>
  text
    .replace(/^\s*[*-]\s+/gm, '• ')
    .split(TOKEN_RE)
    .map((part, i) => {
      if (i % 2 === 0) return <React.Fragment key={i}>{part.replace(/\*+/g, '')}</React.Fragment>;
      const md = /^\[([^\]]+)\]\((.+)\)$/.exec(part);
      if (md) {
        return (
          <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {md[1]}
          </a>
        );
      }
      if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {part}
        </a>
      );
    });

// Stacking with CookieConsent (z-50): the closed button sits below it (z-40),
// so on mobile the consent choice comes first. The open panel sits above it
// (z-[60]), because a visitor who opened the chat is using the chat, and the
// banner otherwise covered the input box.
const ChatWidget: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  // Human check: a one-time Turnstile token, swapped for a 30-minute pass from the server.
  const [token, setToken] = useState<string | null>(null);
  const [pass, setPass] = useState<string | null>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const needsCheck = !!TURNSTILE_SITE_KEY && !pass;

  // Block bodies on purpose: an effect may only return a cleanup function.
  // Current Chrome returns a Promise from scrollIntoView, and an expression
  // body passed that to React, which crashed with "destroy is not a function".
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open || !needsCheck || widgetId.current) return;
    loadTurnstile()
      .then(() => {
        if (!captchaRef.current || !window.turnstile || widgetId.current) return;
        widgetId.current = window.turnstile.render(captchaRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          size: 'flexible',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(null),
        });
      })
      .catch((e: Error) => setError(e.message));
  }, [open, needsCheck]);

  if (!mounted) return null;

  const send = async (text: string) => {
    const content = text.trim().slice(0, 500);
    if (!content || loading) return;
    if (needsCheck && !token) {
      setError('Please complete the quick human check below first.');
      return;
    }
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setError(null);
    setLoading(true);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The greeting is UI-only, so it isn't sent to the model.
        body: JSON.stringify({ messages: next.slice(1), turnstileToken: token, pass }),
      });
      const data = await r.json().catch(() => ({}));
      if (data.pass) setPass(data.pass);
      if (data.needsVerification) {
        // The token was used or rejected, so ask for a fresh check.
        setPass(null);
        setToken(null);
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      }
      if (!r.ok || !data.reply) throw new Error(data.error || 'Something went wrong.');
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Keplix assistant"
          className="fixed bottom-24 right-4 z-[60] flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line-soft bg-white shadow-cardHover"
        >
          <div className="flex items-center justify-between bg-brand-red px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Ask Keplix</p>
              <p className="text-xs opacity-90">AI assistant · answers can be imperfect</p>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/20">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 leading-relaxed ${
                    m.role === 'user' ? 'bg-brand-red text-white' : 'bg-line-soft text-ink-body'
                  }`}
                >
                  {m.role === 'assistant' ? renderText(m.content) : m.content}
                </p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink-body hover:border-brand-red hover:text-brand-red"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && <p className="text-xs text-ink-muted">Typing…</p>}
            {error && (
              <p className="text-xs text-brand-red">
                {error}{' '}
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">
                  Chat with us on WhatsApp
                </a>
              </p>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-line-soft p-3"
          >
            {needsCheck && <div ref={captchaRef} className="mb-2" />}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Type your question…"
                aria-label="Your question"
                className="h-10 flex-1 rounded-btn border border-line px-3 text-sm outline-none focus:border-brand-red"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 items-center justify-center rounded-btn bg-brand-red text-white hover:bg-brand-redHover disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-ink-faint">
              Messages are processed by Google/Groq AI and not stored by us. Don’t share card details, OTPs or personal info.{' '}
              <Link to="/privacy-policy" className="underline">
                Privacy
              </Link>
              {' · '}
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">
                Talk to a human
              </a>
            </p>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open Keplix assistant'}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-cardHover transition-colors hover:bg-brand-redHover"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
};

export default ChatWidget;
