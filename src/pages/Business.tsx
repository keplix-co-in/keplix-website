import React from 'react';
import { Building, Users, TrendingUp, Shield, Clock, Award, CheckCircle, ArrowRight } from 'lucide-react';

const Business = () => {
  const features = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Fleet Management",
      description: "Comprehensive fleet management solutions with real-time tracking, maintenance scheduling, and cost optimization."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated Account Manager",
      description: "Personal account manager to handle all your business needs and ensure seamless service delivery."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics & Reporting",
      description: "Detailed insights and reports on fleet performance, maintenance costs, and operational efficiency."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Priority Support",
      description: "24/7 priority support with guaranteed response times and dedicated technical assistance."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Bulk booking capabilities with flexible scheduling options to minimize business disruption."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Enterprise Pricing",
      description: "Competitive enterprise pricing with volume discounts and customized service packages."
    }
  ];

  const benefits = [
    "Reduce fleet maintenance costs by up to 30%",
    "Minimize vehicle downtime with predictive maintenance",
    "Centralized billing and expense management",
    "Compliance tracking and documentation",
    "Multi-location service coordination",
    "Custom reporting and analytics dashboard"
  ];

  const plans = [
    {
      name: "Startup",
      price: "₹2,999",
      period: "/month",
      vehicles: "Up to 10 vehicles",
      features: [
        "Basic fleet management",
        "Standard support",
        "Monthly reports",
        "Mobile app access",
        "Basic analytics"
      ]
    },
    {
      name: "Growth",
      price: "₹7,999",
      period: "/month",
      vehicles: "Up to 50 vehicles",
      features: [
        "Advanced fleet management",
        "Priority support",
        "Weekly reports",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      vehicles: "Unlimited vehicles",
      features: [
        "Full enterprise solution",
        "24/7 dedicated support",
        "Real-time reporting",
        "Multiple account managers",
        "Custom analytics",
        "API access",
        "White-label options"
      ]
    }
  ];

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
              Keplix for <span className="text-red-500">Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
              Enterprise-grade automotive service solutions designed to scale with your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
              <button className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                Get Started Today
              </button>
              <button className="border border-red-500 text-red-500 px-8 py-4 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* Large BUSINESS Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
            BUSINESS
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise <span className="text-red-500">Features</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Powerful tools and features designed specifically for businesses managing multiple vehicles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 hover:border-red-500/50 group"
              >
                <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Large FEATURES Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
            FEATURES
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-red-500">Keplix Business</span>?
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Transform your fleet management with our comprehensive business solutions that deliver measurable results and operational excellence.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="mt-8 bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                Learn More <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-red-500/20 to-transparent rounded-full absolute inset-0 blur-3xl"></div>
              <img 
                src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Business fleet management"
                className="w-full h-auto rounded-xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-red-500">Plan</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Flexible pricing options designed to grow with your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-8 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 relative ${
                  plan.popular 
                    ? 'border-red-500 ring-2 ring-red-500/20' 
                    : 'border-gray-700 hover:border-red-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-red-500 mb-2">
                    {plan.price}<span className="text-lg text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.vehicles}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                }`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your <span className="text-red-500">Fleet Management</span>?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses already using Keplix to streamline their automotive service operations and reduce costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border border-red-500 text-red-500 px-8 py-4 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300">
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;