import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
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
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide' },
  ]);
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailedItem, setDetailedItem] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  // Enhanced search function with relevance-based scoring
  const filteredItems = items
    .map((item) => {
      const lowerName = item.name.toLowerCase();
      const lowerCategory = item.category.toLowerCase();
      const lowerQuery = searchQuery.toLowerCase();

      let score = 0;
      if (lowerName === lowerQuery || lowerCategory === lowerQuery) score += 3; // Exact match
      else if (lowerName.includes(lowerQuery) || lowerCategory.includes(lowerQuery)) score += 2; // Partial match
      return { ...item, score };
    })
    .filter((item) => (selectedCategory ? item.category === selectedCategory : true) && item.score > 0) // Filter by category and positive score
    .sort((a, b) => b.score - a.score); // Sort by relevance

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Display message if no results match
    if (query && filteredItems.length === 0) {
      setSearchMessage(
        'No items found matching your search. Try browsing the categories in the sidebar.'
      );
    } else {
      setSearchMessage('');
    }
  };

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
    navigate(`/items/${item.id}`, { state: { item } });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Sidebar: Category Filter */}
        <aside className="w-full md:w-1/4 pr-4 md:block flex-none">
          <CategoryFilter categories={['Tractors', 'Equipment']} setSelectedCategory={setSelectedCategory} />
          
          {/* Items on Offer Section */}
          <div className="bg-white shadow-md rounded-lg mt-4 p-4">
            <h2 className="text-xl font-semibold mb-2">Items on Offer</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <span className="text-lg font-medium">{item.name}</span>
                    <div className="text-sm text-gray-600">{item.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-red-500 font-semibold">20% Off</span>
                    <div className="text-xs text-gray-500">Black Friday Sale</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area: Item List or Item Details */}
        <main className="w-full md:w-3/4 mt-4 md:mt-0">
          <SearchBar onSearch={handleSearch} />
          {searchMessage && (
            <p className="text-red-500 text-center mt-4">{searchMessage}</p>
          )}
          {detailedItem ? (
            <ItemDetails item={detailedItem} onAddToCart={addToCart} onBuyNow={(item) => <Checkout item={item} />} />
          ) : (
            <ItemList items={filteredItems} onItemSelect={handleItemSelect} />
          )}
        </main>
      </div>

      {/* Feedback Section */}
      <Feedback />
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
