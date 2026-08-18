import React from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#E0C163] focus:border-[#E0C163] sm:text-sm transition duration-150 ease-in-out"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
