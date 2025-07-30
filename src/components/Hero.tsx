import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    // Set beta testing launch date to August 22, 2025 at 12:00 PM UTC
    const launchDate = new Date('2025-08-22T12:00:00Z');

    const updateCountdown = () => {
      const now = new Date();
      const distance = launchDate.getTime() - now.getTime();

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // Beta launch date has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    // Update immediately
    updateCountdown();
    
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto mb-8 animate-fade-in-delay-2">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-red-500" />
        <span className="text-lg font-semibold text-white">Beta Testing Launch Countdown</span>
      </div>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold text-red-500">{timeLeft.days}</div>
          <div className="text-sm text-gray-400">Days</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold text-red-500">{timeLeft.hours}</div>
          <div className="text-sm text-gray-400">Hours</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold text-red-500">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-400">Minutes</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-2xl md:text-3xl font-bold text-red-500">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-400">Seconds</div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden flex items-center">
      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shooting-star shooting-star-1"></div>
        <div className="shooting-star shooting-star-2"></div>
        <div className="shooting-star shooting-star-3"></div>
        <div className="shooting-star shooting-star-4"></div>
        <div className="shooting-star shooting-star-5"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            "Drive Smarter. Book Faster.<br />
            Trust <span className="text-red-500">Keplix</span>."
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
            "Book, compare, and track auto services at your fingertips."
          </p>

          <CountdownTimer />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <button className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Play size={20} />
              Watch the Beta Now
            </button>
            
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar size={20} />
              <span>Quick service within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Large KEPLIX Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
            KEPLIX
          </div>
        </div>
      </div>

      {/* Animated Circles */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-red-500 rounded-full animate-bounce delay-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-bounce delay-1000"></div>
    </section>
  );
};

export default Hero;