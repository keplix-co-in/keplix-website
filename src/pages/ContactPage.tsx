import React, { useState } from 'react';
import { Clock, MapPin, Send, HeadphonesIcon } from 'lucide-react';

const contactMethods = [
  {
    icon: '/icons/contact-email.svg',
    title: 'Email us',
    description: "Send us an email and we'll respond within 24 hour",
    contact: 'support@keplix.co.in',
  },
  {
    icon: '/icons/contact-phone.svg',
    title: 'Call us',
    description: 'Speak directly with our support team',
    contact: '+91 98189 15720',
  },
  {
    icon: '/icons/contact-chat.svg',
    title: 'Live Chat',
    description: 'Chat with us in real-time for instant support',
    contact: 'Available 24/7',
  },
  {
    icon: '/icons/contact-instagram.svg',
    title: 'Instagram',
    description: 'DM us on instagram for quick responses',
    contact: '@keplix_official',
  },
  {
    icon: '/icons/contact-twitter.svg',
    title: 'Twitter',
    description: 'Tweet to us and we’ll get back to you',
    contact: '@keplix_official',
  },
  {
    icon: '/icons/contact-facebook.svg',
    title: 'Facebook',
    description: 'Message us on facebook for support',
    contact: '@keplix_official',
  },
];

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'business', label: 'Business Partnership' },
  { value: 'press', label: 'Press & Media' },
  { value: 'careers', label: 'Careers' },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '89c66a6e-3aee-4cab-9363-2050f20fa5ec',
        from_name: formData.name,
        ...formData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Thank you for your message! We'll get back to you soon.");
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            inquiryType: 'general',
          });
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      })
      .catch(() => {
        alert('There was an error sending your message. Please try again.');
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-page px-4 pb-8 pt-8 sm:px-8">
        <h1 className="text-4xl font-extrabold text-ink sm:text-5xl">
          Contact Keplix
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink-muted">
          We&apos;re here to help. Reach out to us through any of the channels
          below.
        </p>
      </section>

      {/* Get in Touch */}
      <section className="mx-auto max-w-page px-4 py-8 sm:px-8">
        <h2 className="text-center text-3xl font-bold text-black">
          Get in <span className="text-[#f84a4a]">Touch</span>
        </h2>
        <p className="mt-4 text-center text-xl text-[#636363]">
          Choose the method that works best for you. We&apos;re available
          24/7 to assist you.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map(({ icon, title, description, contact }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-xl bg-blush-300/60 px-8 py-8 text-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <img src={icon} alt="" className="h-12 w-12" />
              <h3 className="mt-3 text-xl font-bold text-ink-heading">
                {title}
              </h3>
              <p className="mt-3 max-w-[200px] text-base text-gray-600">
                {description}
              </p>
              <p className="mt-3 text-base font-medium text-[#d91f26]">
                {contact}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="mx-auto max-w-page px-4 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-card sm:p-8">
            <h3 className="text-xl font-bold text-ink-heading">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-body">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-btn border border-line px-4 py-3 text-ink focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-body">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-btn border border-line px-4 py-3 text-ink focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-body">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-line px-4 py-3 text-ink focus:border-brand-red focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-ink-body">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-line px-4 py-3 text-ink focus:border-brand-red focus:outline-none"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink-body">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-btn border border-line px-4 py-3 text-ink focus:border-brand-red focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink-body">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full resize-none rounded-btn border border-line px-4 py-3 text-ink focus:border-brand-red focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-btn bg-brand-red py-4 text-base font-bold text-white shadow-btn transition-colors hover:bg-brand-redHover"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <Clock className="text-ink" size={22} />
                <h3 className="text-lg font-bold text-ink-heading">
                  Business Hours
                </h3>
              </div>
              <div className="mt-4 flex flex-col gap-2 text-sm text-ink-body">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>12:00 PM - 5:00 PM</span>
                </div>
                <div className="mt-2 flex items-center gap-2 border-t border-line-soft pt-3 text-brand-red">
                  <HeadphonesIcon size={16} />
                  <span className="font-semibold">
                    24/7 Emergency Support Available
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line-soft bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <MapPin className="text-ink" size={22} />
                <h3 className="text-lg font-bold text-ink-heading">
                  Our Office
                </h3>
              </div>
              <h4 className="mt-4 text-base font-semibold text-brand-red">
                Delhi
              </h4>
              <p className="mt-1 text-sm text-ink-muted">
                9/2659, Kailash Nagar, Gandhi Nagar, Delhi, 110031
              </p>
              <div className="mt-3 flex flex-col gap-1 text-sm text-ink-faint">
                <span>+91 98189 15720</span>
                <span>support@keplix.co.in</span>
              </div>
            </div>

            <div className="rounded-2xl border border-line-soft bg-white p-4 shadow-card">
              <div className="mb-3 flex items-center gap-3 px-2">
                <MapPin className="text-ink" size={20} />
                <h3 className="text-base font-bold text-ink-heading">
                  Find Us
                </h3>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674!2d77.23148931507842!3d28.650094882430087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683916387%3A0x633e9511b6a0e53b!2sKailash%20Nagar%2C%20Gandhi%20Nagar%2C%20Delhi%2C%20110031!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Keplix Office Location - Kailash Nagar, Gandhi Nagar, Delhi"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
