import React from "react";
import { DishListDish } from "./DishListDish";

export const DishesOfDishList = ({ dishListDishes, setDishListDishes }) => {

    return (
        <>
            {
                dishListDishes.map(dishListDish =>
                        <DishListDish key={dishListDish.id}
                                      dishListDish={dishListDish}
                                      setDishListDishes={setDishListDishes} />)
            }
        </>
    );
}
