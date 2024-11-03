import { useContext } from "react";
import { StateContext } from "../../../Context/StateContext.jsx";

export default function FilterButton({ category }) {

  const {
    dishCategoryFilter
    , handleDishCategoryFiltering
  } = useContext(StateContext);

  return (
    <button 
      className={
        `category-filter-button ${category === dishCategoryFilter ? "cfb-active" : ""}`
      }
      onClick={() => handleDishCategoryFiltering(category)}>
        <strong>{category.length > 10 ? category.slice(0,10) +'...' : category }</strong>
    </button>
  );
}