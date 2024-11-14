import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkout from './Checkout';
import ItemList from './ItemList';
import ItemDetails from './ItemDetails';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import Feedback from './Feedback';
import Footer from './Footer';

const ITEMS_PER_PAGE = 2; // Adjust for the number of items per page for each category

const Home = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { id: 1, name: 'Tractor Model A', sellerNo: "+254748800714", price: 15000, description: 'Reliable tractor for farm work', images: ['/img1.jpg', '/img1_hover.jpg'], category: 'Tractors', deliveryType: 'Countrywide' },
    { id: 2, name: 'Plow', sellerNo: "+254748800714", price: 2000, description: 'Durable plow for efficient tilling', images: ['/img2.jpg', '/img2_hover.jpg'], category: 'Equipment', deliveryType: 'Countrywide' },
    // Add more items with appropriate categories
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailedItem, setDetailedItem] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [page, setPage] = useState({}); // Keep track of current page for each category

  // Group items by category for display and pagination
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Handle pagination and filtering
  const paginatedItems = (category) => {
    const categoryItems = itemsByCategory[category] || [];
    const currentPage = page[category] || 1;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return categoryItems.slice(start, start + ITEMS_PER_PAGE);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Update search results or display message if no results found
    if (query && filteredItems.length === 0) {
      setSearchMessage('No items found matching your search. Try browsing the categories.');
    } else {
      setSearchMessage('');
    }
  };

  const addToCart = (item, quantity) => {
    setCartItems([...cartItems, { ...item, quantity }]);
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, quantity }),
    });
  };

  const handleItemSelect = (item) => {
    setDetailedItem(item);
    navigate(`/items/${item.id}`, { state: { item } });
  };

  // Pagination controls
  const handlePageChange = (category, newPage) => {
    setPage((prev) => ({ ...prev, [category]: newPage }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {/* Sidebar: Category Filter and Items on Offer */}
        <aside className="w-full md:w-1/4 mb-4 md:mb-0 md:pr-4">
          <CategoryFilter categories={Object.keys(itemsByCategory)} setSelectedCategory={setSelectedCategory} />
          
          {/* Offers Section */}
          <div className="bg-white shadow-md rounded-lg mt-4 p-4">
            <h2 className="text-xl font-semibold mb-2">Items on Offer</h2>
            {items.map((item) => (
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
        </aside>

        {/* Main Content Area: Category Display */}
        <main className="w-full md:w-3/4 md:pl-4 flex flex-col">
          <SearchBar onSearch={handleSearch} />
          {searchMessage && <p className="text-red-500 text-center mt-4">{searchMessage}</p>}
          
          {/* Display items by category with pagination */}
          {Object.keys(itemsByCategory).map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <ItemList items={paginatedItems(category)} onItemSelect={handleItemSelect} />

              {/* Pagination controls */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(category, (page[category] || 1) - 1)}
                  disabled={(page[category] || 1) <= 1}
                  className="px-3 py-1 border rounded-l-lg"
                >
                  Prev
                </button>
                <span className="px-3 py-1 border-t border-b">{page[category] || 1}</span>
                <button
                  onClick={() => handlePageChange(category, (page[category] || 1) + 1)}
                  disabled={paginatedItems(category).length < ITEMS_PER_PAGE}
                  className="px-3 py-1 border rounded-r-lg"
                >
                  Next
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Feedback and Footer */}
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
