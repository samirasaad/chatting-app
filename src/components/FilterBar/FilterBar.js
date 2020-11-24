import React from "react";
import Input from "../Controls/Input/Input";

const FilterBar = ({ handleFilter, handleChange, searchValue }) => {
  return (
    <form onSubmit={handleFilter} className="filter-bar my-2 mx-3">
      <Input
        type="text"
        className="w-100 p-2"
        handleChange={handleChange}
        value={searchValue}
        placeholder="Search for a friend"
      />
    </form>
  );
};

export default FilterBar;
