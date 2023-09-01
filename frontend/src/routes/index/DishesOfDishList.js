import React from "react";
import { DishListDish } from "./DishListDish";

export const DishesOfDishList = ({ dishListDishes, setDishListDishes }) => {

    return (
        <div className="dish-list-wrapper">
            {
                dishListDishes.map(dishListDish =>
                        <DishListDish key={dishListDish.id}
                                      dishListDish={dishListDish}
                                      setDishListDishes={setDishListDishes} />)
            }
        </div>
    );
}
