import React from "react";
import { DishListDish } from "./DishListDish";

export const DishesOfDishList = ({ dishList, setDishList }) => {

    console.log(dishList);

    return (
        <>
            {
                dishList.dishListDishes.map(dish => <DishListDish key={dish.id}
                        dishList={dishList} setDishList={setDishList} dish={dish}
                        selected={dishList.selected} />)
            }
        </>
    );
}