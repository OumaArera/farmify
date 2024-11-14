import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openWhatsApp = () => {
    window.open('https://wa.me/254748800714', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:info@farmify.com', '_blank');
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/dir/?api=1&destination=Juja%2C+Kenya', '_blank');
  };

  return (
    <footer className="bg-green-800 text-white p-6 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="mb-2">Farmify Equipment is your trusted source for quality farm equipment and accessories.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-white hover:text-gray-400" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-white hover:text-gray-400" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-white hover:text-gray-400" />
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok className="text-white hover:text-gray-400" />
              </a>
            </div>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
            <p className="cursor-pointer hover:text-gray-400" onClick={openWhatsApp}>
              Phone: +254 748 800 714
            </p>
            <p className="cursor-pointer hover:text-gray-400" onClick={openEmail}>
              Email: info@farmify.com
            </p>
            <p className="cursor-pointer hover:text-gray-400" onClick={openGoogleMaps}>
              Location: Juja town
            </p>
          </div>

          {/* My Account Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">My Account</h3>
            <Link to="/myaccount" className="block mb-1 text-white hover:text-gray-400">
              My Account
            </Link>
            <Link to="/cart" className="block text-white hover:text-gray-400">
              Cart
            </Link>
          </div>

          {/* Google Map Section */}
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Map</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31835.681040904667!2d37.0338!3d-1.1789!3m2!1i1024!2i768!4f13.1!2m1!1sJuja%20town!5e0!3m2!1sen!2ske!4v1615294036714!5m2!1sen!2ske"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              title="Farmify Equipment Location Map"
              className="border-0 rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p>&copy; {currentYear} Farmify Equipment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
