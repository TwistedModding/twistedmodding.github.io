import React, { useState } from 'react';

const Search = ({ onSectionChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="search-container">
      <label htmlFor="search-input" className="sr-only">Search content</label>
      <input 
        type="text" 
        id="search-input" 
        className="search-input" 
        placeholder="Search content..."
        aria-label="Search content"
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleSearch}
      />
      <button 
        type="button" 
        className="search-button" 
        aria-label="Search"
        title="Search content"
      ></button>
    </div>
  );
};

export default Search;
