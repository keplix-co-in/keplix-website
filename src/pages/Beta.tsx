import React, { useState } from 'react';
import { Users, Clock, CheckCircle, Star, Zap, Shield, Award } from 'lucide-react';
import PageBlob from '../components/PageBlob';

const Beta = () => {
  const [seatsRemaining, setSeatsRemaining] = useState(() => {
    // Load from localStorage or default to 100
    const saved = localStorage.getItem('keplix-beta-seats');
    return saved ? parseInt(saved, 10) : 100;
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    experience: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Save seats remaining to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('keplix-beta-seats', seatsRemaining.toString());
  }, [seatsRemaining]);

  const vehicleTypes = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Luxury Car',
    'Electric Vehicle',
    'Motorcycle',
    'Commercial Vehicle'
  ];

  const experiences = [
    'First-time user',
    'Occasional service user',
    'Regular service user',
    'Fleet manager',
    'Automotive professional'
  ];

  const betaFeatures = [
    {
      icon: <Zap className="h-8 w-8" />,
      iconColor: 'text-brand-red',
      title: "Early Access",
      description: "Be among the first to experience Keplix's revolutionary platform"
    },
    {
      icon: <Star className="h-8 w-8" />,
      iconColor: 'text-ink',
      title: "Exclusive Discounts",
      description: "Up to 50% off on all services during the beta period"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      iconColor: 'text-brand-red',
      title: "Priority Support",
      description: "Direct access to our development team for feedback and support"
    },
    {
      icon: <Award className="h-8 w-8" />,
      iconColor: 'text-ink',
      title: "Lifetime Benefits",
      description: "Special pricing and features that continue after beta launch"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Fleet Manager",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "Keplix beta has transformed how we manage our company fleet. The transparency and ease of booking is incredible!"
    },
    {
      name: "Priya Sharma",
      role: "Car Owner",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "Finally, a platform that makes car servicing stress-free. The real-time tracking feature is a game-changer."
    },
    {
      name: "Amit Patel",
      role: "Business Owner",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "The beta program gave us insights into the future of automotive care. Highly recommended!"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '89c66a6e-3aee-4cab-9363-2050f20fa5ec',
          subject: 'New Keplix Beta Application',
          from_name: formData.name,
          ...formData,
          seats_remaining: seatsRemaining - 1
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSeatsRemaining(prev => Math.max(0, prev - 1));
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          vehicleType: '',
          experience: '',
          feedback: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative overflow-hidden">
      <PageBlob />

      {/* Hero Section */}
      <section className="relative z-10 pb-16 pt-[69px]">

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-6 py-2 mb-6">
              <Users className="w-5 h-5 text-brand-red" />
              <span className="text-brand-red font-semibold">Limited Beta Access</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Join Keplix <span className="text-brand-red">Beta</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-ink-body mb-8 animate-fade-in-delay">
              Be part of the automotive revolution. Limited seats available for early adopters.
            </p>

            {/* Seats Counter */}
            <div className="bg-white border border-line-soft shadow-card rounded-xl p-6 mb-8 max-w-md mx-auto animate-fade-in-delay-2">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-brand-red" />
                <span className="text-lg font-semibold">Seats Remaining</span>
              </div>
              <div className="text-4xl font-bold text-brand-red mb-2">{seatsRemaining}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(seatsRemaining / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-ink-muted mt-2">out of 100 beta spots</p>
            </div>
          </div>
        </div>

        {/* Large BETA Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-ink-heading/5 text-center leading-none">
            BETA
          </div>
        </div>
      </section>

      {/* Beta Features */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Beta Program <span className="text-brand-red">Benefits</span>
            </h2>
            <p className="text-ink-body text-lg max-w-2xl mx-auto">
              Exclusive advantages for our beta testers who help shape the future of automotive care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {betaFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl bg-blush-200/70 p-6 text-center transition-transform duration-300 hover:scale-105"
              >
                <div className={`mb-4 flex justify-center ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <h3 className="text-ink-heading text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-ink-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white border border-line-soft shadow-card rounded-xl p-8">
              <h3 className="text-3xl font-bold text-ink-heading mb-6">Apply for Beta Access</h3>
              
              {seatsRemaining === 0 && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6 mb-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                    <Users className="w-6 h-6" />
                    <span className="font-bold text-lg">Beta Program Full!</span>
                  </div>
                  <p className="text-yellow-400 text-sm">
                    All 100 beta spots have been filled. Thank you for your interest! 
                    Join our waitlist to be notified when we launch publicly.
                  </p>
                </div>
              )}
              
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Application Submitted Successfully!</span>
                  </div>
                  <p className="text-green-400 text-sm mt-1">We'll review your application and get back to you within 48 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                  <p className="text-red-400">There was an error submitting your application. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-brand-red transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-brand-red transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-brand-red transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Vehicle Type
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink-heading focus:outline-none focus:border-brand-red transition-colors"
                    >
                      <option value="">Select vehicle type</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-body mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink-heading focus:outline-none focus:border-brand-red transition-colors"
                    >
                      <option value="">Select experience</option>
                      {experiences.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-body mb-2">
                    Why do you want to join the beta? (Optional)
                  </label>
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white border border-line rounded-lg px-4 py-3 text-ink placeholder-ink-faint focus:outline-none focus:border-brand-red transition-colors resize-none"
                    placeholder="Tell us about your automotive service needs and what you hope to achieve with Keplix..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || seatsRemaining === 0}
                  className="w-full bg-brand-red text-ink-heading py-4 rounded-lg font-semibold hover:bg-brand-redHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : seatsRemaining === 0 ? (
                    'Beta Program Full'
                  ) : (
                    'Apply for Beta Access'
                  )}
                </button>
              </form>
            </div>

            {/* Testimonials */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-ink-heading mb-6">What Beta Users Say</h3>
                <p className="text-ink-body mb-8">
                  Hear from our current beta testers about their experience with Keplix.
                </p>
              </div>

              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white border border-line-soft shadow-card rounded-xl p-6 hover:shadow-cardHover transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-red/20"
                    />
                    <div className="flex-1">
                      <p className="text-ink-body mb-4 italic">"{testimonial.quote}"</p>
                      <div>
                        <div className="text-ink-heading font-semibold">{testimonial.name}</div>
                        <div className="text-brand-red text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-line-soft shadow-card rounded-xl p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-ink-heading mb-6">
              Don't Miss Out on the <span className="text-brand-red">Future</span>
            </h3>
            <p className="text-ink-body text-lg mb-8 max-w-2xl mx-auto">
              Join the exclusive group of early adopters who will shape the future of automotive care. Limited spots available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-red text-ink-heading px-8 py-4 rounded-full font-semibold hover:bg-brand-redHover transition-all duration-300 transform hover:scale-105"
              >
                Apply Now - {seatsRemaining} Spots Left
              </button>
              <button className="border border-brand-red text-brand-red px-8 py-4 rounded-full font-semibold hover:bg-brand-red hover:text-ink-heading transition-all duration-300">
                Learn More About Beta
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beta;