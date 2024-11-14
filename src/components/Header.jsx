import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTractor, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ cartTotal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-green-800 text-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <FaTractor className="text-3xl text-yellow-400" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide hover:text-yellow-300 transition">
            Farmify Equipment
          </h1>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto md:static absolute left-0 top-full md:top-auto bg-green-800 md:bg-transparent z-10 px-6 md:px-0`}
        >
          <Link
            to="/myaccount"
            className="flex items-center space-x-2 hover:text-yellow-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaUserCircle className="text-xl" />
            <span>My Account</span>
          </Link>
          
          <Link
            to="/cart"
            className="flex items-center space-x-2 hover:text-yellow-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaShoppingCart className="text-xl" />
            <span>
              Cart: <span className="font-semibold">KES {cartTotal?.toFixed(2) || "0.00"}</span>
            </span>
          </Link>

          {/* Join Button */}
          <a
            href="https://external-join-site.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-green-800 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
