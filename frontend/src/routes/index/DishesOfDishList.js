import React from "react";
import { FetchingIndicator } from "../../FetchingIndicator";
import { DishListDish } from "./DishListDish";

export const DishesOfDishList = ({ fetching, dishListDishes, setDishListDishes }) => {

    const content = () => {
        if (fetching) {
            return <FetchingIndicator />
        } else {
            return dishListDishes.map(dishListDish => <DishListDish
                    key={dishListDish.id}
                    dishListDish={dishListDish}
                    setDishListDishes={setDishListDishes} />)
        }
    }

    return (
        <div className="dish-list-wrapper">
            { content() }
        </div>
    );
}
