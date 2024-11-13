import React from 'react';

const Feedback = () => (
  <div className="bg-gray-100 p-6 mt-8 rounded shadow-md">
    <h2 className="text-xl font-semibold mb-4">Customer Feedback</h2>
    {/* Display feedbacks */}
    <div className="space-y-2">
      <p>"The best farm equipment marketplace I've used!" - Alice</p>
      <p>"Fast and reliable delivery!" - John</p>
      {/* Add more static or dynamic feedback as needed */}
    </div>

    {/* Feedback Form */}
    <form className="mt-4">
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="4"
        placeholder="Share your experience with us..."
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit Feedback
      </button>
    </form>
  </div>
);

export default Feedback;
