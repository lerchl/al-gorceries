import axios from "axios";
import { React } from "react";
import { API_URL, DISH_LIST, handleAnswer } from "../../ApiUtils";
import { getWeekNumber } from "../../DateUtils";

export const GenerateDishListButton = ({ date, getDishList, setDishList }) => {

    const generateDishList = () => {
        axios.post(`${API_URL}/${DISH_LIST}/${date.getFullYear()}/${getWeekNumber(date)}`).then(res => {
            handleAnswer(res, 201);
            setDishList(res.data);
        });
    }

    return (
        <button onClick={generateDishList} className="custom-button primary mr-2">Gerichte generieren</button>
    );
}
