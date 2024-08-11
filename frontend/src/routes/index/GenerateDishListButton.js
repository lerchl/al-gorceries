import axios from "axios";
import { React } from "react";
import { useTranslation } from "react-i18next";
import { API_URL, DISH_LIST, handleAnswer } from "../../ApiUtils";
import { getWeekNumber } from "../../DateUtils";

export const GenerateDishListButton = ({ date, setDishList, setDishListDishes }) => {

	const { t } = useTranslation();

    const generateDishList = async () => {
        const res = await axios.post(`${API_URL}/${DISH_LIST}/${date.getFullYear()}/${getWeekNumber(date)}`);
        handleAnswer(res, 201);
        setDishList(res.data);
        setDishListDishes(res.data.dishListDishes);
    }

    return <button onClick={generateDishList}
				   className="custom-button primary ml-2"
				   style={{ width: "100%" }}>
		{ t("index.generateDishes") }
	</button>;
}
