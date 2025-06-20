import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, MessageSquare, ChevronDown, User, LogOut, Leaf, Store } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { unreadNotificationsCount, unreadMessagesCount } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't show header if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            className="md:hidden p-2 rounded-full hover:bg-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <Leaf size={28} className="text-accent-300" />
            <span className="text-xl font-bold">AgriGrow</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="py-2 hover:text-accent-300 transition-colors">Dashboard</Link>
          <Link to="/markets" className="py-2 hover:text-accent-300 transition-colors">Markets</Link>
          <Link to="/market-connect" className="py-2 hover:text-accent-300 transition-colors flex items-center">
            <Store size={18} className="mr-1" />
            Market Connect
          </Link>
          <Link to="/crops" className="py-2 hover:text-accent-300 transition-colors">My Crops</Link>
          <Link to="/weather" className="py-2 hover:text-accent-300 transition-colors">Weather</Link>
          <Link to="/messages" className="py-2 hover:text-accent-300 transition-colors">Messages</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative p-2 rounded-full hover:bg-primary-600 transition-colors">
            <Bell size={20} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </Link>
          <Link to="/messages" className="relative p-2 rounded-full hover:bg-primary-600 transition-colors">
            <MessageSquare size={20} />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-0 right-0 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <User size={18} />
              </div>
              <span className="hidden md:block">{user.email}</span>
              <ChevronDown size={16} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-error-500"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-600 animate-fade-in">
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link 
              to="/" 
              className="py-3 px-2 border-b border-primary-400 hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/markets" 
              className="py-3 px-2 border-b border-primary-400 hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Markets
            </Link>
            <Link 
              to="/market-connect" 
              className="py-3 px-2 border-b border-primary-400 hover:bg-primary-700 transition-colors flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Store size={18} className="mr-2" />
              Market Connect
            </Link>
            <Link 
              to="/crops" 
              className="py-3 px-2 border-b border-primary-400 hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Crops
            </Link>
            <Link 
              to="/weather" 
              className="py-3 px-2 border-b border-primary-400 hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Weather
            </Link>
            <Link 
              to="/messages" 
              className="py-3 px-2 hover:bg-primary-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Messages
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;