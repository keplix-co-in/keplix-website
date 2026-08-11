import React, { useState } from 'react';
import { submitForm } from '../lib/submitForm';
import { sectionSubtitleClass, cardTitleClass } from '../constants/typography';

const RADIO_ACCENT = '#2563eb';

const futureFeatures = [
  {
    icon: '/icons/future-ai-chip.svg',
    title: 'AI-Powered Diagnostics',
    description: 'Detect issues early with smart AI technology.',
  },
  {
    icon: '/icons/future-bell.svg',
    title: 'Electric Vehicle Services',
    description: 'Specialized EV service and battery care solutions.',
  },
  {
    icon: '/icons/future-location-pin.svg',
    title: 'Expanding to 50+ Cities',
    description: 'Bringing trusted car care to your city soon.',
  },
];

type Role = 'Car Owner' | 'Workshop Owner' | 'Partner / Other';

const Contact: React.FC = () => {
  const [role, setRole] = useState<Role>('Car Owner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [help, setHelp] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const result = await submitForm(
      'quick',
      { name, email, role, help, message },
      honeypot,
    );

    if (result.ok) {
      setStatus('done');
      setName('');
      setEmail('');
      setHelp('');
      setMessage('');
    } else {
      setStatus('error');
      setErrorMessage(result.error);
    }
  };

  return (
    <section className="relative z-10 bg-black px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-black">
            <video
              src="/mapani.mp4"
              autoPlay
              loop
              muted
              playsInline
              // Below the fold — don't spend a phone's data on it until the
              // browser actually gets round to playing it.
              preload="none"
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The Future of Car Care
            </h2>
            <p className={`${sectionSubtitleClass} mt-4 text-gray-400`}>
              We&apos;re building the most advanced automotive ecosystem for
              today and tomorrow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {futureFeatures.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#434e64] p-5 text-center"
                >
                  <img src={icon} alt="" className="mx-auto h-10 w-10" />
                  <h3 className={`${cardTitleClass} mt-4 text-white`}>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{description}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 flex h-[53px] w-[180px] items-center justify-center rounded-btn bg-brand-red text-base font-bold text-white transition-colors hover:bg-brand-redHover">
              Explore our vision
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Get in Touch
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <p className="mb-3 text-sm text-gray-400">I am a</p>
              <div className="flex flex-wrap gap-6">
                {(['Car Owner', 'Workshop Owner', 'Partner / Other'] as Role[]).map(
                  (option) => (
                    /* py-2 lifts the row to a ~40px target; the label wraps
                       the text so the whole thing is tappable, not just the
                       16px radio itself. */
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 py-2 text-sm text-gray-300"
                    >
                      <input
                        type="radio"
                        name="role"
                        checked={role === option}
                        onChange={() => setRole(option)}
                        className="h-4 w-4"
                        style={{ accentColor: RADIO_ACCENT }}
                      />
                      {option}
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Name and email are required — without them a submission can't
                be replied to. */}
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="rounded-btn border border-gray-700 bg-white px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="rounded-btn border border-gray-700 bg-white px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none"
              />
            </div>

            <select
              value={help}
              onChange={(e) => setHelp(e.target.value)}
              className="rounded-btn border border-gray-700 bg-white px-4 py-3 text-ink-muted focus:outline-none"
            >
              <option value="">How can we help?</option>
              <option value="general">General inquiry</option>
              <option value="support">Support</option>
              <option value="partnership">Partnership</option>
            </select>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              rows={5}
              required
              className="resize-none rounded-btn border border-gray-700 bg-white px-4 py-3 text-ink placeholder:text-ink-muted focus:outline-none"
            />

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-btn bg-brand-red py-4 text-base font-bold text-white transition-colors hover:bg-brand-redHover disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send a message'}
            </button>

            {status === 'done' && (
              <p className="rounded-btn bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-300">
                Thanks — your message is on its way. We&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-btn bg-red-500/15 px-4 py-3 text-sm font-medium text-red-300">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
