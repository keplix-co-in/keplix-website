import { Facebook, Twitter, Instagram, Linkedin, Youtube, Smartphone, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Keplix Logo" 
                className="h-28 w-auto transition-all duration-300 hover:scale-105"
                onError={(e) => {
                  console.error('Footer logo failed to load:', e);
                  // Fallback to text logo if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="text-2xl font-bold hidden">
                <span className="text-red-500">K</span>eplix
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Revolutionizing car care with technology and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/keplix" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/keplix" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/keplix.co.in" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/keplix" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com/keplix" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-red-500 transition-colors">About us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Car Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Maintenance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Modifications</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Consultation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Fleet Management</a></li>
            </ul>
          </div>

          {/* Career Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Careers Section</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Opportunities</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Work With Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Open Roles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Culture</a></li>
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-red-500" />
              <div>
                <h5 className="text-lg font-semibold">Download the App</h5>
                <p className="text-gray-300">Get the Keplix app on your phone</p>
              </div>
            </div>
            <div className="flex gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play Store" 
                className="h-12"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                className="h-12"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-red-500" />
              <a href="mailto:support@keplix.co.in" className="text-gray-300 hover:text-red-500 transition-colors">
                support@keplix.co.in
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500" />
              <a href="tel:+919818915720" className="text-gray-300 hover:text-red-500 transition-colors">
                +91 98189 15720
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <a 
                href="https://maps.google.com?q=9/2659,+Kailash+Nagar,+Gandhi+Nagar,+Delhi,+110031" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-red-500 transition-colors"
              >
                9/2659, Kailash Nagar, Gandhi Nagar, Delhi, 110031
              </a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Legal</a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">Cookie Policy</a>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} Keplix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;