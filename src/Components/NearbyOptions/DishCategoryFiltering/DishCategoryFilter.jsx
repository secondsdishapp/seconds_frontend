import { useState } from "react";
import FilterButton from "./FilterButton.jsx";

export default function DishCategoryFilter() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex flex-row justify-around">
      {/* <FilterButton
        filter={filter}
        setFilter={setFilter}
        filterName={"All"}
      />
      <FilterButton
        filter={filter}
        setFilter={setFilter}
        filterName={"Vegetarian"}
      />
      <FilterButton
        filter={filter}
        setFilter={setFilter}
        filterName={"Vegan"}

      />
      <FilterButton
        filter={filter}
        setFilter={setFilter}
        filterName={"Gluten Free"}
      /> */}
    </div>
  )
}