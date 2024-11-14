import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTractor, FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Header = ({ cartTotal }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-green-800 text-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <FaTractor className="text-3xl text-yellow-400" />
          <h1 className="text-3xl font-bold tracking-wide hover:text-yellow-300 transition">Farmify Equipment</h1>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link to="/myaccount" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaUserCircle className="text-xl" />
            <span>My Account</span>
          </Link>
          
          <Link to="/cart" className="flex items-center space-x-2 hover:text-yellow-300 transition">
            <FaShoppingCart className="text-xl" />
            <span>Cart: <span className="font-semibold">KES {cartTotal?.toFixed(2) || "0.00"}</span></span>
          </Link>

          {/* Join Button */}
          <a href="https://external-join-site.com" target="_blank" rel="noopener noreferrer" 
             className="bg-yellow-400 text-green-800 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition">
            Join Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
