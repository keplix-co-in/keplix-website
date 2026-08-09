import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageBlob from '../components/PageBlob';

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

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '12:00 PM - 5:00 PM' },
];

const fieldClass =
  'h-[50px] w-full rounded-[8px] border border-black/10 bg-white px-4 text-[14px] text-ink outline-none transition-colors focus:border-brand-red';
const labelClass = 'block text-[14px] font-medium leading-[20px] text-[#363636]';
const cardClass =
  'rounded-[12px] bg-white p-6 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]';
const cardHeadingClass = 'text-[16px] font-semibold leading-[28px] text-black';

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
    <div className="relative overflow-hidden">
      <PageBlob />

      {/* Hero + Get in Touch */}
      <section className="relative z-10">
        <div className="mx-auto max-w-page px-4 sm:px-8">
          {/* Figma indents this page's text to x=163 in a 1280 frame. Expressed
              as a % of the container so the indent scales with the page. */}
          <div className="lg:pl-[10.8%]">
            {/* Text content */}
            <div className="flex flex-col gap-7 py-[42px]">
              <h1 className="text-4xl font-bold leading-tight text-ink sm:text-[56px] sm:leading-[72px]">
                Contact Keplix
              </h1>
              <p className="max-w-[512px] text-lg font-medium text-ink-muted sm:text-[20px]">
                We&apos;re here to help. Reach out to us through any of the
                channels below..
              </p>
            </div>

            {/* Get in Touch */}
            <h2 className="pt-[19px] text-[28px] font-bold text-black">
              Get in <span className="text-[#f84a4a]">Touch</span>
            </h2>
            <p className="mt-4 text-[20px] text-[#636363]">
              Choose the method that works best for you. We&apos;re available
              24/7 to assist you.
            </p>
          </div>

          {/* Cards sit in their own inset block, centred in the container —
              70% reproduces Figma's 856-in-1216 at 1280 and scales from there. */}
          <div className="pb-16">
            <div className="mx-auto mt-[53px] grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-[70%] lg:grid-cols-3">
              {contactMethods.map(({ icon, title, description, contact }) => (
                <div
                  key={title}
                  className="flex flex-col items-center rounded-[12px] bg-[#fbf0f0] px-8 pb-[34px] pt-8 text-center drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                >
                  <img src={icon} alt="" className="h-12 w-12" />
                  <h3 className="mt-3 text-[20px] font-bold text-[#111827]">
                    {title}
                  </h3>
                  <p className="mt-6 text-[16px] font-medium text-[#4b5563]">
                    {description}
                  </p>
                  <p className="mt-3 text-[16px] font-medium text-[#d91f26]">
                    {contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="relative z-10 mx-auto max-w-page px-4 pb-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[705fr_495fr]">
          {/* Message form */}
          <div className="rounded-[12px] bg-white p-8 drop-shadow-[0px_4px_2px_rgba(0,0,0,0.28)]">
            <h2 className={cardHeadingClass}>Send us a Message</h2>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Inquiry Type</label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className={`${fieldClass} appearance-none pr-11 text-[12px]`}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-[9px] top-1/2 -translate-y-1/2 text-ink"
                      size={24}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2 pb-1.5">
                <label className={labelClass}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="h-[170px] w-full resize-none rounded-[8px] border border-black/10 bg-white px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-brand-red"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[8px] bg-[#da1e27] py-4 text-center text-[16px] font-bold leading-6 text-white transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {/* Business hours */}
            <div className={cardClass}>
              <h2 className={cardHeadingClass}>Business Hours</h2>
              <div className="mt-6 flex flex-col gap-4">
                {businessHours.map(({ day, hours }) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-[14px] leading-5 text-[#363636]">
                      {day}
                    </span>
                    <span className="text-[14px] font-medium leading-5 text-black">
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-[#d6d6d7] pt-[25px]">
                <img src="/icons/contact-headset.svg" alt="" className="h-5 w-5" />
                <span className="text-[14px] font-semibold leading-5 text-[#f84a4a]">
                  24/7 Emergency Support Available
                </span>
              </div>
            </div>

            {/* Our office */}
            <div className={cardClass}>
              <h2 className={cardHeadingClass}>Our Office</h2>
              <div className="mt-6 flex flex-col gap-[15px]">
                <p className="text-[16px] font-bold leading-6 text-[#f84a4a]">
                  Delhi
                </p>
                <p className="text-[14px] leading-[22.75px] text-[#363636]">
                  9/2659, Kailash Nagar, Gandhi Nagar, Delhi, 110031
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="/icons/contact-phone-sm.svg"
                    alt=""
                    className="h-4 w-4"
                  />
                  <span className="text-[14px] leading-5 text-[#363636]">
                    +91 98189 15720
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/icons/contact-mail-sm.svg"
                    alt=""
                    className="h-4 w-4"
                  />
                  <span className="text-[14px] leading-5 text-[#363636]">
                    support@keplix.co.in
                  </span>
                </div>
              </div>
            </div>

            {/* Find us */}
            <div className={`${cardClass} flex flex-col gap-6`}>
              <h2 className={cardHeadingClass}>Find Us</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674!2d77.23148931507842!3d28.650094882430087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683916387%3A0x633e9511b6a0e53b!2sKailash%20Nagar%2C%20Gandhi%20Nagar%2C%20Delhi%2C%20110031!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin"
                className="h-[203px] w-full rounded-[8px] border border-[#494f56]"
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
