import React from 'react';
import { Zap, TrendingUp, MapPin } from 'lucide-react';

const Future = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Electric Vehicle Services",
      description: "Specialized services for electric vehicles including battery diagnostics and charging solutions."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI-Powered Diagnostics",
      description: "Advanced AI technology that analyzes vehicle data to predict issues, provide personalized recommendations, and optimize maintenance schedules."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Pan-India Expansion",
      description: "We're growing rapidly across India with plans to expand to over 50 cities by 2025."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The <span className="text-red-500">Future</span> of Car Care
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Get Ready for AI-powered diagnostics to predict issues, electric vehicle services, and expansion to more cities. Today's auto service marketplace will be tomorrow's comprehensive automotive ecosystem.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Car Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500/20 to-transparent rounded-full absolute inset-0 blur-3xl"></div>
            <img 
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern Red Sports Car"
              className="w-full h-auto rounded-xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;