import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => onSearch(query.trim());

  return (
    <div className="flex items-center bg-white p-2 rounded shadow-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full p-2 outline-none"
      />
      <button onClick={handleSearch} className="p-2 bg-green-700 text-white rounded">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
