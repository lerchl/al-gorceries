import { useEffect, useState } from "react";
import { createEntity, DISHES, DISH_LIST, getEntities, handleAnswer } from "../../ApiUtils";
import { getWeekNumber } from "../../DateUtils";

export const GenerateDishListButton = ({ date, getDishList, setDishList }) => {

    const [dishes, setDishes] = useState([]);

    useEffect(() => getEntities(DISHES, setDishes), []);

    const generateDishList = () => {
        const dishList = {
            year: date.getFullYear(),
            week: getWeekNumber(date),
            dishes: dishes.sort((_a, _b) => 0.5 - Math.random()).slice(0, 5)
        }
        createEntity(DISH_LIST, dishList).then(res => {
            handleAnswer(res, 201);
            getDishList(date, setDishList);
        });
    }

    return (
        <button onClick={generateDishList} className="custom-button primary mr-2">Gerichte generieren</button>
    );
}