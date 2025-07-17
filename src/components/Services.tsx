import React from 'react';
import { Wrench, Shield, Clock, CheckCircle, Car, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Keep Up-to-date with long-term auto care",
      description: "Stay informed about your vehicle's maintenance schedule and service history."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keep your reputation free in seconds",
      description: "Maintain your service record and build trust with verified reviews."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Check trusted workshops with transparent pricing",
      description: "Find certified service centers with upfront pricing and no hidden fees."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get access to quality auto accessories",
      description: "Browse premium auto parts and accessories from trusted suppliers."
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Access your car's full maintenance history",
      description: "Complete digital record of all services and repairs for your vehicle."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Install trusted workshops within your area",
      description: "Connect with verified local mechanics and service centers near you."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            "Your Ultimate Car Care <span className="text-red-500">Solution</span>"
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Streamline your automotive needs with our comprehensive platform designed for modern drivers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 hover:border-red-500/50 group"
            >
              <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Large SERVICE Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
          SERVICE
        </div>
      </div>
    </section>
  );
};

export default Services;