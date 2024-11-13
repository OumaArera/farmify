import React from 'react';
import ItemCard from './ItemCard';
import Pagination from './Pagination';

const ItemList = ({ items, onItemSelect }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onClick={() => onItemSelect(item)} />
        ))}
      </div>
      <Pagination totalItems={items.length} itemsPerPage={8} />
    </div>
  );
};

export default ItemList;
