// Offers.js
import React from 'react';

const Offers = ({ offers }) => {
  return (
    <section className="bg-green-50 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-green-800">Special Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white p-4 shadow-lg rounded-lg">
            <img src={offer.images[0]} alt={offer.name} className="w-full h-32 object-cover mb-2 rounded-md" />
            <h3 className="text-lg font-semibold">{offer.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{offer.offerType}</p>
            <p className="text-gray-500">{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
