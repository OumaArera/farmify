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

  // Toggle states for sidebars
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);

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

  // Functions for handling toggle
  const toggleCategorySidebar = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleOfferSidebar = () => setIsOfferOpen(!isOfferOpen);

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="container mx-auto p-4 flex flex-wrap md:flex-nowrap">

        {/* Toggle Buttons for Mobile View */}
        <button onClick={toggleCategorySidebar} className="md:hidden bg-green-700 text-white p-2 rounded mb-2">
          Categories
        </button>
        <button onClick={toggleOfferSidebar} className="md:hidden bg-green-700 text-white p-2 rounded mb-2 ml-2">
          Offers
        </button>

        {/* Sidebar for Categories */}
        <aside className={`fixed inset-0 bg-gray-200 bg-opacity-90 z-20 p-4 transform ${isCategoryOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0 md:bg-opacity-100`}>
          <button onClick={toggleCategorySidebar} className="md:hidden bg-red-500 text-white p-2 rounded mb-4">Close</button>
          <CategoryFilter categories={allCategories} setSelectedCategory={setSelectedCategory} />
        </aside>

        {/* Sidebar for Offers */}
        <aside className={`fixed inset-0 bg-green-50 bg-opacity-90 z-20 p-4 transform ${isOfferOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0 md:bg-opacity-100`}>
          <button onClick={toggleOfferSidebar} className="md:hidden bg-red-500 text-white p-2 rounded mb-4">Close</button>
          <Offers offers={offers} onOfferSelect={handleItemSelect} />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 md:ml-4">
          <SearchBar onSearch={handleSearch} />
          {searchMessage && <p className="text-red-500 text-center mt-4">{searchMessage}</p>}
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
