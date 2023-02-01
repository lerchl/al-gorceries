import React from 'react';
import { DISH_LIST, updateEntityAndGetEntity } from "../../ApiUtils";
import { DishInfos } from "../dishes/DishInfos";

export const DishListDish = ({ dishList, setDishList, dish, selected }) => {

    const select = () => {
        dishList.selectedDishes.push(dish);
        update();
    }

    const deselect = () => {
        dishList.selectedDishes = dishList.selectedDishes.filter(d => d.id !== dish.id);
        update();
    }

    function update() {
        updateEntityAndGetEntity(DISH_LIST, dishList, setDishList);
    }

    return (
        <div onClick={() => selected ? deselect() : select()} className={selected ? "selectable selected" : "selectable"}>
            <h2>{dish.name}</h2>
            <DishInfos dish={dish} />
        </div>
    );
}