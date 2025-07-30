import { Users, Target, Award, Zap, Heart, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "Every decision we make is centered around delivering exceptional value and service to our customers."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "We continuously push boundaries with cutting-edge technology to revolutionize automotive care."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality",
      description: "We maintain the highest standards in service delivery and partner only with certified professionals."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessibility",
      description: "Making quality automotive services accessible to everyone, everywhere across India."
    }
  ];

  const team = [
    {
      name: "Vardan Chaturvedi",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "6+ years in automotive industry"
    },
    {
      name: "Aditya Narayan",
      role: "Head of Technology",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Tech visionary with AI expertise"
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
              About <span className="text-red-500">Keplix</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-delay">
              Revolutionizing automotive care through technology, innovation, and unwavering commitment to excellence.
            </p>
          </div>
        </div>

        {/* Large ABOUT Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
            ABOUT
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <Target className="w-10 h-10 text-red-500" />
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To democratize access to quality automotive services by connecting vehicle owners with trusted professionals through innovative technology, ensuring transparency, convenience, and excellence in every interaction.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-10 h-10 text-red-500" />
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To become India's most trusted automotive service ecosystem, where every vehicle owner has seamless access to reliable, transparent, and affordable car care solutions powered by cutting-edge technology.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-red-500/20 to-transparent rounded-full absolute inset-0 blur-3xl"></div>
              <img 
                src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-auto rounded-xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-red-500">Values</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 hover:border-red-500/50 group text-center"
              >
                <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Large VALUES Text Overlay */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <div className="text-[20vw] md:text-[15vw] font-black text-white/5 text-center leading-none">
            VALUES
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 pb-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-red-500">Team</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The passionate individuals driving innovation in automotive care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12 hover:bg-gray-800/80 transition-all duration-300 transform hover:scale-105 group text-center min-h-[400px] flex flex-col justify-center"
              >
                <div className="relative mb-10">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-red-500/20 group-hover:border-red-500/50 transition-colors"
                  />
                </div>
                <h3 className="text-white text-3xl font-bold mb-6 group-hover:text-red-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-red-500 font-semibold mb-6 text-xl">
                  {member.role}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed font-medium">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;