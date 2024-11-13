import React from 'react';

const Footer = () => (
  <footer className="bg-green-800 text-white p-6 mt-8">
    <div className="container mx-auto">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p>Farmify Equipment is your trusted source for quality farm equipment and accessories.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Get in Touch</h3>
          <p>Email: support@farmify.com</p>
          <p>Phone: +254 700 123 456</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <p>Facebook | Twitter | Instagram</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
