// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTractor } from 'react-icons/fa';

const Header = ({ cartTotal }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-green-700 p-4 flex justify-between items-center text-white shadow-md">
      {/* Company Name with link to Home */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <FaTractor className="text-2xl" />
        <h1 className="text-2xl font-bold">Farmify Equipment</h1>
      </div>

      {/* My Account and Cart Links */}
      <nav className="flex space-x-6">
        <Link to="/myaccount" className="hover:underline">
          My Account
        </Link>
        <Link to="/cart" className="hover:underline">
          Cart: KES {cartTotal ||  0.00}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
