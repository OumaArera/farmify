import React, { useState } from 'react';
import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import Checkout from './Checkout';
import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import Feedback from './Feedback';
import Footer from './Footer';
import Offers from './Offers';

const Home = () => {
  const navigate = useNavigate();
  
  const [items, setItems] = useState([
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tool A', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Tool B', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tool C', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Tool D', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tool A', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Tool B', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tool C', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Tool D', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tool A', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Tool B', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tool C', deliveryType: 'Countrywide', offerType: '10% Off' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Tool D', deliveryType: 'Countrywide', offerType: 'Buy 1 Get 1 Free' },
  ]);

  const [offers, setOffers] = useState([
    { id: 101, name: 'Christmas Tractor', sellerNo: "+254748800714", price: 13000, description: 'Special offer for Christmas', images: ['/offer1.jpg', '/offer1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide', offerType: 'Christmas', offerPeriod: 'Dec 1 - Dec 25', percentageOff: 15 },
    { id: 102, name: 'New Plow Model', sellerNo: "+254748800714", price: 1800, description: 'New item in the market', images: ['/offer2.jpg', '/offer2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide', offerType: 'New', offerPeriod: 'Jan 1 - Jan 15', percentageOff: 10 },
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailedItem, setDetailedItem] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  const allCategories = [...new Set(items.map(item => item.category).concat(offers.map(offer => offer.category)))];

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

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 flex">
        <aside className="w-1/4 pr-4">
        <CategoryFilter categories={allCategories} setSelectedCategory={setSelectedCategory} />
        <Offers offers={offers} onOfferSelect={handleItemSelect} />
        </aside>
        <main className="w-3/4">
          <SearchBar onSearch={handleSearch} />
          {searchMessage && (
            <p className="text-red-500 text-center mt-4">{searchMessage}</p>
          )}
          {detailedItem ? (
            <ItemDetails item={detailedItem} onAddToCart={addToCart} onBuyNow={(item) => <Checkout item={item} />} />
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mt-6">{category}</h2>
                <ItemList items={items} onItemSelect={handleItemSelect} />
              </div>
            ))
          )}
        </main>
      </div>
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
