import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Pagination from "../Pagination/Pagination";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6; // Number of recipes to display per page

  // Filter food items based on the category
  const filteredFoodList = category === "All" ? food_list : food_list.filter(item => item.category === category);

  // Calculate the indices for the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentFoodList = filteredFoodList.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {currentFoodList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={filteredFoodList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default FoodDisplay;
