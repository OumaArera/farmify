import React from 'react';

const ItemCard = ({ item, onClick }) => (
  <div onClick={onClick} className="border rounded shadow p-2 cursor-pointer hover:shadow-md">
    <img
      src={item.images[0]}
      alt={item.name}
      className="w-full h-32 object-cover"
      onMouseOver={(e) => (e.currentTarget.src = item.images[1])}
      onMouseOut={(e) => (e.currentTarget.src = item.images[0])}
    />
    <h4 className="text-lg font-semibold text-green-700">{item.name}</h4>
    <p className="text-gray-700">KES {item.price}</p>
  </div>
);

export default ItemCard;
