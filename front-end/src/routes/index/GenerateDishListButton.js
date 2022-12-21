import { React, useEffect, useState } from "react";
import { createEntity, DISHES, DISH_LIST, getEntities, handleAnswer } from "../../ApiUtils";
import { getWeekNumber } from "../../DateUtils";

export const GenerateDishListButton = ({ date, getDishList, setDishList }) => {

    const [dishes, setDishes] = useState([]);

    useEffect(() => getEntities(DISHES, setDishes), []);

    const generateDishList = () => {
        const dishList = {
            year: date.getFullYear(),
            week: getWeekNumber(date),
            dishes: dishes.filter(bySeason).sort((_a, _b) => 0.5 - Math.random()).slice(0, 40)
        }
        createEntity(DISH_LIST, dishList).then(res => {
            handleAnswer(res, 201);
            getDishList(date, setDishList); 
        });
    }

    const bySeason = dish => {
        const today = new Date();

        return dish.seasons.map(seasonToBeginAndAnd).every(([begin, end]) => {
            console.log(begin <= today && today <= end);
            return begin <= today && today <= end;
        });
    }

    const seasonToBeginAndAnd = season => {
        let begin = new Date();
        let end = new Date();

        begin.setDate(season.beginDay);
        begin.setMonth(season.beginMonth);

        end.setDate(season.endDay);
        end.setMonth(season.endMonth);

        if (begin > end) {
            end.setYear(end.getFullYear() + 1);
        }

        return [begin, end];
    }

    return (
        <button onClick={generateDishList} className="custom-button primary mr-2">Gerichte generieren</button>
    );
}
