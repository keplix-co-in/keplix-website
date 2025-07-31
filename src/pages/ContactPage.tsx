import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'business', label: 'Business Partnership' },
    { value: 'press', label: 'Press & Media' },
    { value: 'careers', label: 'Careers' }
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@keplix.co.in",
      action: "Send Email"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+91 98189 15720",
      action: "Call Now"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with us in real-time for instant support",
      contact: "Available 24/7",
      action: "Start Chat"
    }
  ];

  const offices = [
    {
      city: "Delhi",
      address: "9/2659, Kailash Nagar, Gandhi Nagar, Delhi, 110031",
      phone: "+91 98189 15720",
      email: "support@keplix.co.in"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit to Web3Forms
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: '89c66a6e-3aee-4cab-9363-2050f20fa5ec',
        from_name: formData.name,
        ...formData
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Contact <span className="text-red-500">Keplix</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
              We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>

        {/* Large CONTACT Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
            CONTACT
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-red-500">Touch</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Choose the method that works best for you. We're available 24/7 to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                  {method.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {method.description}
                </p>
                <p className="text-red-500 font-semibold mb-6">
                  {method.contact}
                </p>
                <button className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Send className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-red-500 transition-colors"
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-white">Business Hours</h3>
                </div>
                <div className="space-y-3 text-gray-300">
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
                  <div className="border-t border-gray-700 pt-3 mt-4">
                    <div className="flex items-center gap-2 text-red-500">
                      <HeadphonesIcon className="w-5 h-5" />
                      <span className="font-semibold">24/7 Emergency Support Available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-white">Our Office</h3>
                </div>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="text-lg font-semibold text-red-500 mb-2">{office.city}</h4>
                      <p className="text-gray-300 mb-2">{office.address}</p>
                      <div className="flex flex-col gap-1 text-sm text-gray-400">
                        <span>📞 {office.phone}</span>
                        <span>✉️ {office.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-white">Find Us</h3>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674!2d77.23148931507842!3d28.650094882430087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0683916387%3A0x633e9511b6a0e53b!2sKailash%20Nagar%2C%20Gandhi%20Nagar%2C%20Delhi%2C%20110031!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ 
                    border: 0, 
                    borderRadius: '8px',
                    filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)'
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Keplix Office Location - Kailash Nagar, Gandhi Nagar, Delhi"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, our 24/7 support team is available."
              },
              {
                question: "Do you offer support in multiple languages?",
                answer: "Yes, we provide support in Hindi, English, and several regional languages to better serve our diverse customer base across India."
              },
              {
                question: "Can I schedule a demo of your business solutions?",
                answer: "Absolutely! You can schedule a personalized demo by contacting our business team or using the 'Schedule Demo' button on our Business page."
              },
              {
                question: "What's the best way to report a technical issue?",
                answer: "For technical issues, please use our support email or live chat feature. Include as much detail as possible about the issue you're experiencing."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;