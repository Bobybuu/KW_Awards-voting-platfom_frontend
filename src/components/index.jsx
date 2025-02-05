import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // THIS ARE OUR NAV LINKS ...ADD MORE LINKS HERE AND THE ROUTE IF YOU INTEND TO EXPAND
  const links = [
    { to: '/', label: 'Home' },
    { to: '/vote', label: 'Vote' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/aboutus', label: 'About Us' },
    { to: '/register', label: 'Register' },
    { to: '/faqs', label: 'FAQs' },
  ];

  return (
    <nav className="bg-blue-600 p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white md:hidden focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="space-y-2 w-8 h-8 p-1">
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
          {/* TODO: ADD A LOGO */}
          <Link
            to="/"
            className="text-white font-bold text-2xl hover:text-gray-300 transition duration-300"
          >
             LOGO
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white hover:text-gray-300 hover:underline transition duration-300 px-3 py-2 rounded-lg hover:bg-blue-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation with Animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-blue-600 p-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;