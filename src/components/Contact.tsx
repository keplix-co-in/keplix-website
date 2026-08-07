import React, { useState } from 'react';
import { Cpu, Bell, MapPin } from 'lucide-react';

const RADIO_ACCENT = '#2563eb';

const futureFeatures = [
  {
    icon: Cpu,
    title: 'AI-Powered Diagnostics',
    description: 'Detect issues early with smart AI technology.',
  },
  {
    icon: Bell,
    title: 'Electric Vehicle Services',
    description: 'Specialized EV service and battery care solutions.',
  },
  {
    icon: MapPin,
    title: 'Expanding to 50+ Cities',
    description: 'Bringing trusted car care to your city soon.',
  },
];

type Role = 'Car Owner' | 'Workshop Owner' | 'Partner / Other';

const Contact: React.FC = () => {
  const [role, setRole] = useState<Role>('Car Owner');
  const [help, setHelp] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '89c66a6e-3aee-4cab-9363-2050f20fa5ec',
        subject: 'New Contact Form Submission - Keplix',
        role,
        help,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Thank you for your message! We'll get back to you soon.");
          setHelp('');
          setMessage('');
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      })
      .catch(() => {
        alert('There was an error sending your message. Please try again.');
      });
  };

  return (
    <section className="bg-black px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-black">
            <img
              src="/future-map-illustration.png"
              alt="Illustration of a city map with location pins"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The Future of Car Care
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We&apos;re building the most advanced automotive ecosystem for
              today and tomorrow.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {futureFeatures.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#434e64] p-5 text-center"
                >
                  <Icon className="mx-auto text-gray-400" size={28} />
                  <h3 className="mt-4 text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{description}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 rounded-btn bg-brand-red px-8 py-3 text-base font-bold text-white shadow-btn transition-colors hover:bg-brand-redHover">
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
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm text-gray-300"
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

            <button
              type="submit"
              className="rounded-btn bg-brand-red py-4 text-base font-bold text-white transition-colors hover:bg-brand-redHover"
            >
              Send a message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
