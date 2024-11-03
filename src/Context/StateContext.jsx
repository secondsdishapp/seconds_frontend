import { useState, createContext } from "react";

const StateContext = createContext();

function StateContextProvider({ children }) {

  const [ dishCategoryFilters, setDishCategoryFilters ] = useState([]);
  const [ dishCategoryFilter, setDishCategoryFilter ] = useState("");
  
  const contextValue = {
    dishCategoryFilters
    , setDishCategoryFilters
    , dishCategoryFilter
    , setDishCategoryFilter
  }

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  )
}

export { StateContext, StateContextProvider };