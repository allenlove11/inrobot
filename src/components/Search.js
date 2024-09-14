import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from "@/src/svg/search-icon";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="sidebar__search">
      <form onSubmit={handleSubmit}>
        <div className="sidebar__search-input-2">
          <input
            type="text"
            placeholder="Search by AI tools"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;