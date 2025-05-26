import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  if (!user) {
    return null;
  }

  return (
    <footer className="bg-primary-500 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf size={24} className="text-accent-300" />
              <span className="text-xl font-bold">AgriGrow</span>
            </div>
            <p className="text-sm text-gray-200 mb-4">
              Connecting farmers with markets and buyers for sustainable agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-300 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-accent-300 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/markets" className="text-gray-200 hover:text-accent-300 transition-colors">
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/crops" className="text-gray-200 hover:text-accent-300 transition-colors">
                  My Crops
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-gray-200 hover:text-accent-300 transition-colors">
                  Weather
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-200 hover:text-accent-300 transition-colors">
                  Farming Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-accent-300 transition-colors">
                  Market Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-accent-300 transition-colors">
                  Crop Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-accent-300 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-200">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-200">support@agrigrow.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-400 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-200">
            &copy; {currentYear} AgriGrow. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-200 hover:text-accent-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-200 hover:text-accent-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;