const CategoryFilter = ({ categories, setSelectedCategory }) => (
    <div className="bg-gray-200 p-4 rounded">
      <h3 className="font-semibold text-lg">Categories</h3>
      {categories.map((category) => (
        <div key={category}>
          <button onClick={() => setSelectedCategory(category)} className="text-green-700 hover:underline">{category}</button>
        </div>
      ))}
    </div>
  );
  
  export default CategoryFilter;
  