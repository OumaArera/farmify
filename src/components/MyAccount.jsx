import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate();

  // Check for user details and access token
  const user = JSON.parse(localStorage.getItem('user')); // Assuming 'user' is stored as JSON with user details
  const accessToken = localStorage.getItem('accessToken'); // Access token for authenticated requests

  useEffect(() => {
    // Redirect to login if user details or token are missing
    if (!user || !accessToken) {
      navigate('/login');
    }
  }, [user, accessToken, navigate]);

  // Logout function to clear user data and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  // Render My Account details if user is logged in
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      {user && (
        <div className="bg-gray-100 p-4 rounded shadow-lg">
          <p className="text-lg font-semibold mb-4">Welcome, {user.name}!</p>
          
          <div className="space-y-2">
            {/* Button to navigate to Orders */}
            <button 
              onClick={() => navigate('/orders')}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              View Orders
            </button>

            {/* Button to navigate to Cart */}
            <button 
              onClick={() => navigate('/cart')}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              View Cart
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded mt-4"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
