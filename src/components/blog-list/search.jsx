import SearchIcon from "@/src/svg/search-icon";
import React from "react";

const Search = () => {
  return (
    <div className="sidebar__search">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="sidebar__search-input-2">
          <input type="text" placeholder="Search your keyword..." />
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
