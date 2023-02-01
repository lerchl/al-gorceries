import React from "react";
import { DishListDish } from "./DishListDish";

export const DishesOfDishList = ({ dishList, setDishList }) => {

    return (
        <>
            {
                dishList.dishes.map(dish => <DishListDish key={dish.id}
                        dishList={dishList} setDishList={setDishList} dish={dish}
                        selected={dishList.selectedDishes.some(d => d.id === dish.id)} />)
            }
        </>
    );
}