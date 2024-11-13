import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Helper function to generate page numbers
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-700 text-white'}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded ${currentPage === page ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-700 text-white'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
