import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = [
        { id: 1, volume: 1000, name: 'Tractor Model A', price: 15000, quantity: 1, image: '/tractor.jpg' },
        { id: 2, volume: 74, name: 'Plow', price: 2000, quantity: 2, image: '/plow.jpg' },
      ];
      setCartItems(items);
      calculateTotal(items);
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalValue(total);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0); // Filter out items with quantity 0
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleCheckout = () => {
    const checkoutDetails = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      volume: item.volume,
      quantity: item.quantity,
    }));

    navigate('/checkout', { state: { cartTotal: totalValue, checkoutDetails } });
  };

  const handleBuyNow = (item) => {
    const checkoutDetails = [{
      id: item.id,
      name: item.name,
      price: item.price,
      volume: item.volume,
      quantity: item.quantity,
    }];
    navigate('/checkout', { state: { cartTotal: item.price * item.quantity, checkoutDetails } });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 mb-4 border-b rounded-md shadow-sm hover:shadow-lg">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover mr-6" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.quantity} x KES {item.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
              >
                +
              </button>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
              >
                -
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <button
              onClick={() => handleBuyNow(item)}
              className="ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
      <div className="flex justify-between items-center font-semibold text-xl mt-6">
        <span>Total: </span>
        <span>KES {totalValue}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white w-full py-2 mt-4 rounded-md hover:bg-blue-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
