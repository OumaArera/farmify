import React from 'react';

const CategoryFilter = ({ categories, setSelectedCategory, setIsCategoryOpen }) => (
  <div className="bg-gray-200 p-4 rounded">
    <h3 className="font-semibold text-lg">Categories</h3>
    {categories.map((category) => (
      <div key={category}>
        <button 
          onClick={() => {
            setSelectedCategory(category);
            setIsCategoryOpen(false);
          }} 
          className="text-green-700 hover:underline w-full text-left p-2 rounded-lg"
        >
          {category}
        </button>
      </div>
    ))}
  </div>
);

export default CategoryFilter;
