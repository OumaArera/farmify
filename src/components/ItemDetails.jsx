import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ItemDetails = ({ onAddToCart }) => {
  const location = useLocation();
  const item = location.state?.item;
  
  const [selectedImage, setSelectedImage] = useState(item?.images[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <div>Loading...</div>;
  }

  const addToCart = () => {
    onAddToCart(item, quantity);
  };

  // Handle WhatsApp Chat with seller
  const handleChatWithSeller = () => {
    const message = `Hello, I'm interested in the following item:\n\n*${item.name}*\nPrice: KES ${item.price}\nDescription: ${item.description}\n\nCan you provide more details?\n\n${selectedImage}`;
    
    const whatsappUrl = `https://wa.me/${item.sellerNo}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="relative">
          <img
            src={selectedImage}
            alt={item.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="flex space-x-2 mt-4 justify-center">
            {item.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 cursor-pointer border rounded-lg ${selectedImage === img ? 'border-green-600' : 'border-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mt-4 text-center">{item.name}</h2>
        <p className="text-xl text-green-600 text-center mt-1">KES {item.price}</p>
        <p className="text-gray-700 mt-2 text-center">{item.description}</p>
        <p className="text-green-500 text-center mt-4">Delivery: {item.deliveryType}</p>

        <div className="flex items-center justify-center space-x-4 mt-6">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded p-2 w-20 text-center"
          />
          <button onClick={addToCart} className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition">
            Add to Cart
          </button>
          <button onClick={handleChatWithSeller} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Chat with Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
