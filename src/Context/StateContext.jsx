import { useState, createContext } from "react";

const StateContext = createContext();

function StateContextProvider({ children }) {

  
  const [ entireList, setEntireList ] = useState([]);
  const [ finalEntireList, setFinalEntireList ] = useState([]);
  // dish category filtering
  const [ dishCategoryFilters, setDishCategoryFilters ] = useState([]);
  const [ dishCategoryFilter, setDishCategoryFilter ] = useState("");

  // dish categeory filtering
  function handleDishCategoryFiltering(category) {
    if (category === dishCategoryFilter) {
      setDishCategoryFilter("");
      setFinalEntireList(entireList);
    } else {
        setDishCategoryFilter(category);
        setFinalEntireList(entireList.filter((el) => el.dish_name.toLowerCase().includes(category.toLowerCase())));
    }
  }

  const contextValue = {
    // dish results
    entireList, setEntireList
    , finalEntireList, setFinalEntireList
    // dish category filtering
    , dishCategoryFilters, setDishCategoryFilters
    , dishCategoryFilter, setDishCategoryFilter
    , handleDishCategoryFiltering
  }

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  )
}

export { StateContext, StateContextProvider };