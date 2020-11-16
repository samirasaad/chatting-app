import React from "react";
import "./FilterBar.scss";

const FilterBar = ({ handleFilter, handleChange, searchValue }) => {
  return (
    <form onSubmit={handleFilter} className="filter-bar my-2">
      <input
        type="text"
        className="w-100 p-2"
        onChange={handleChange}
        value={searchValue}
        placeholder="Search for a friend"
      />
    </form>
  );
};

export default FilterBar;
