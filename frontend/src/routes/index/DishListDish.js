import axios from 'axios';
import React from 'react';
import { API_URL, DISH_LIST_DISH } from "../../ApiUtils";
import { DishInfos } from "../dishes/DishInfos";

export const DishListDish = ({ dishListDish, setDishListDishes }) => {

    const toggleSelection = () => {
        axios.put(`${API_URL}/${DISH_LIST_DISH}/${dishListDish.id}`, { "selected": !dishListDish.selected }).then(res => {
            setDishListDishes(dishListDishes => {
                const newDishList = dishListDishes.map(dishListDish => {
                    if (dishListDish.id === res.data.id) {
                        return res.data;
                    } else {
                        return dishListDish;
                    }
                });

                return newDishList;
            });
        });
    }

    const getClasses = () => {
        let classes = "selectable";

        if (dishListDish.selected) {
            classes += " selected";
        }

        return classes;
    }

    return (
        <div onClick={toggleSelection} className={getClasses()}>
            <h2>{dishListDish.dish.name}</h2>
            <DishInfos dish={dishListDish.dish} />
        </div>
    );
}