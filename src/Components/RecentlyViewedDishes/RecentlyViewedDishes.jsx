import React, { useEffect, useState } from "react";

const RecentlyViewedDishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const storedDishes = JSON.parse(localStorage.getItem("recentlyViewedDishes")) || [];
    setDishes(storedDishes);
  }, []);

  return (
    <div>
      <h2>Recently Viewed Dishes</h2>
      {dishes.length > 0 ? (
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              <h3>{dish.name}</h3>
              <p>Location: {dish.location}</p>
              <p>Rating: {dish.rating || "No rating"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recently viewed dishes.</p>
      )}
    </div>
  );
};

export default RecentlyViewedDishes;
