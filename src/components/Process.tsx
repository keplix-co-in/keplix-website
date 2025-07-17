import React from 'react';
import { Download, Search, Calendar, Clock } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: 1,
      icon: <Download className="w-8 h-8" />,
      title: "Download Keplix",
      description: "Get the app from your app store and sign up for your free account with access to all features."
    },
    {
      number: 2,
      icon: <Search className="w-8 h-8" />,
      title: "Choose Your Service",
      description: "Pick the best service for your needs. Connect with top-rated certified mechanics and shop appointment with just a few taps and secure your bookings."
    },
    {
      number: 3,
      icon: <Calendar className="w-8 h-8" />,
      title: "Compare & Book",
      description: "Browse and compare auto services, prices, and offerings, then book your appointment with ease and efficiency."
    },
    {
      number: 4,
      icon: <Clock className="w-8 h-8" />,
      title: "Track in Real-Time",
      description: "Follow service progress, receive updates, and get comprehensive list of everything done on your vehicle with full transparency."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Car Care, <span className="text-red-500">Redefined</span> in 4 Steps
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Keplix simplifies the entire process of finding, booking, and managing automotive services with cutting-edge technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              {/* Background Number */}
              <div className="absolute top-4 right-4 text-6xl font-black text-gray-100 group-hover:text-red-50 transition-colors">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors relative z-10">
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;