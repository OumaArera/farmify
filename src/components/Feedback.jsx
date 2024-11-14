import React, { useState, useEffect } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const dummyData = [
      { name: 'Alice', review: 'Great service and quality products!', rating: 5 },
      { name: 'Bob', review: 'Quick delivery and responsive customer service.', rating: 4 },
      { name: 'Charlie', review: 'Good overall, but the site could be faster.', rating: 3 },
      { name: 'Dana', review: 'Received my order late, but the product was worth it.', rating: 4 },
      { name: 'Eve', review: 'Amazing! Exceeded my expectations.', rating: 5 },
    ];

    setReviews(dummyData);
    calculateAverageRating(dummyData);
  };

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avgRating = reviews.length ? totalRating / reviews.length : 0;
    setAverageRating(avgRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { name, review, rating };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    calculateAverageRating([...reviews, newReview]);
    setShowForm(false);
    setName('');
    setReview('');
    setRating(0);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating] += 1;
    });
    const totalReviews = reviews.length;
    Object.keys(distribution).forEach((key) => {
      distribution[key] = (distribution[key] / totalReviews) * 100;
    });
    return distribution;
  };

  // Pagination controls
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="bg-gray-100 p-6 mt-8 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Customer Feedback</h2>

      {/* Display Average Rating */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
        <div className="flex items-center mb-2">
          <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
          <span className="ml-2 text-yellow-400 flex">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
            ))}
          </span>
        </div>

        {/* Rating Distribution */}
        {Object.entries(getRatingDistribution()).map(([star, percentage]) => (
          <div key={star} className="flex items-center mb-1">
            <span className="text-sm w-6">{star}⭐</span>
            <div className="w-full bg-gray-200 rounded h-2 ml-2">
              <div style={{ width: `${percentage}%` }} className="h-full bg-green-500 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Display reviews horizontally with pagination */}
      <div className="flex overflow-x-auto space-x-4 mb-4">
        {paginatedReviews.map((rev, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md flex-shrink-0 w-72">
            <div className="flex items-center mb-2">
              <FaUserCircle className="text-gray-500 text-3xl mr-2" />
              <p className="font-semibold">{rev.name}</p>
            </div>
            <div className="flex items-center mb-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < rev.rating ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <p>"{rev.review}"</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center space-x-2 mb-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Rate Us Button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Rate Us
        </button>
      )}

      {/* Feedback Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`cursor-pointer ${i < (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
