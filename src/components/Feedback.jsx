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

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="flex justify-center items-center bg-gray-100 p-8">
      <div className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-lg space-y-6">
        
        {/* Average Rating Display */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Feedback</h2>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-3xl font-semibold text-green-600">{averageRating.toFixed(1)}</span>
            <div className="text-yellow-500 flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">Based on {reviews.length} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {Object.entries(getRatingDistribution()).map(([star, percentage]) => (
            <div key={star} className="flex items-center">
              <span className="text-sm w-8">{star}⭐</span>
              <div className="flex-1 bg-gray-200 h-2 rounded-md overflow-hidden">
                <div style={{ width: `${percentage}%` }} className="h-full bg-green-500"></div>
              </div>
              <span className="ml-2 text-xs text-gray-500">{percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>

        {/* Reviews Display with Horizontal Scroll */}
        <div className="flex overflow-x-auto space-x-4 py-4">
          {paginatedReviews.map((rev, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md flex-shrink-0 w-72">
              <div className="flex items-center space-x-2 mb-2">
                <FaUserCircle className="text-gray-500 text-3xl" />
                <p className="font-semibold">{rev.name}</p>
              </div>
              <div className="flex items-center mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className={i < rev.rating ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-600">"{rev.review}"</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Feedback Form */}
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
            Rate Us
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <textarea
              placeholder="Your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border rounded-md"
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
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
