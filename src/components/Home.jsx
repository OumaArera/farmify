import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Checkout from './Checkout';
import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import Feedback from './Feedback';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();
  
  const [items, setItems] = useState([
    { id: 1, name: 'Tractor Model A', price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide' },
    { id: 2, name: 'Plow', price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide' },
  ]);
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailedItem, setDetailedItem] = useState(null);

  // Filter items by category and search
  const filteredItems = items.filter((item) =>
    (selectedCategory ? item.category === selectedCategory : true) &&
    (searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  // Add to Cart with backend POST request
  const addToCart = (item, quantity) => {
    setCartItems([...cartItems, { ...item, quantity }]);
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, quantity }),
    });
  };

  // Handle Item selection to navigate to item details page
  const handleItemSelect = (item) => {
    setDetailedItem(item);
    navigate(`/items/${item.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 flex">
        <aside className="w-1/4 pr-4">
          <CategoryFilter categories={['Tractors', 'Equipment']} setSelectedCategory={setSelectedCategory} />
        </aside>
        <main className="w-3/4">
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          {detailedItem ? (
            <ItemDetails item={detailedItem} onAddToCart={addToCart} onBuyNow={(item) => <Checkout item={item} />} />
          ) : (
            <ItemList items={filteredItems} onItemSelect={handleItemSelect} />
          )}
        </main>
      </div>
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
