import React from 'react';

const FilterTabs = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
            activeFilter === filter.value
              ? 'bg-black text-[#E0C163]'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
