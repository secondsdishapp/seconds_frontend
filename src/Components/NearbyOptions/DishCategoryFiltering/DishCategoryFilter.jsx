import { useState, useContext } from "react";
import FilterButton from "./FilterButton.jsx";

import { StateContext } from "../../../Context/StateContext.jsx";

export default function DishCategoryFilter() {
  const {
    dishCategoryFilters
    , dishCategoryFilter
  } = useContext(StateContext);

  return (
    <div className="category-filter-container">
      <div className="category-filters">
        {dishCategoryFilters.map((category) => (
          <FilterButton category={category} />
        ))}
      </div>
      {dishCategoryFilter ? 
        <h4 className="active-dish-filter"><strong>Current Filter: {dishCategoryFilter}</strong></h4> :
        null
      }
    </div>
  )
}