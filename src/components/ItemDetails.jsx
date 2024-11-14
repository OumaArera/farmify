import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ItemDetails = ({ onAddToCart, onBuyNow }) => {
  const location = useLocation();
  const item = location.state?.item;
  
  const [selectedImage, setSelectedImage] = useState(item?.images[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <img src={selectedImage} alt={item.name} className="w-full h-64 object-cover" />
      <div className="flex space-x-2 mt-2">
        {item.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setSelectedImage(img)}
            className="w-16 h-16 cursor-pointer border"
          />
        ))}
      </div>
      <h2 className="text-2xl font-semibold">{item.name}</h2>
      <p className="text-lg text-gray-700">KES {item.price}</p>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-green-600 mt-4">Delivery: {item.deliveryType}</p>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border rounded p-2 w-16 mt-2"
      />
      <button onClick={() => onAddToCart(item, quantity)} className="bg-green-700 text-white px-4 py-2 rounded mt-2">
        Add to Cart
      </button>
      <button onClick={() => onBuyNow(item)} className="bg-blue-600 text-white px-4 py-2 rounded mt-2 ml-2">
        Buy Now
      </button>
    </div>
  );
};

export default ItemDetails;
