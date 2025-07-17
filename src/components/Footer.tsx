import React from 'react';
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
            <div className="text-2xl font-bold mb-4">
              <span className="text-red-500">K</span>eplix
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Revolutionizing car care with technology and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
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
              <span className="text-gray-300">support@keplix.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500" />
              <span className="text-gray-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-gray-300">Mumbai, India</span>
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