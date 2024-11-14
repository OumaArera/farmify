import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartTotal }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-700 p-4 flex justify-between items-center text-white shadow-md">

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link to="/myaccount" className="hover:underline">My Account</Link>
        <Link to="/cart" className="hover:underline">
          Cart: KES {cartTotal}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
