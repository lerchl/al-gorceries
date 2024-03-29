import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { DISH_INGREDIENTS, getEntities, getEntitiesWithParam, INGREDIENTS, MEASUREMENTS } from "../../ApiUtils";
import { DishIngredientDialog } from "./DishIngridientDialog";
import { DishIngridientsContainer } from "./DishIngridientsContainer";

export const DishIngridients = ({ dishId }) => {

    const [dishIngridients, setDishIngridients] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [ingridients, setIngridients] = useState([]);

    const [showAddDialog, setShowAddDialog] = useState(false);

    useEffect(() => getEntitiesWithParam(DISH_INGREDIENTS, setDishIngridients, dishId), []);
    useEffect(() => getEntities(MEASUREMENTS, setMeasurements), []);
    useEffect(() => getEntities(INGREDIENTS, setIngridients), []);

    return (
        <>
            <div className="space-between">
                <h2>Zutaten</h2>
                <button className="icon-button mb-2" title="Zutat hinzufügen" onClick={() => setShowAddDialog(true)}>
                    <PlusLg color="white" size={30} />
                </button>
            </div>
            <DishIngridientsContainer dishId={dishId} dishIngridients={dishIngridients}
                    setDishIngridients={setDishIngridients}
                    ingridients={ingridients} measurements={measurements} />
            <DishIngredientDialog show={showAddDialog}
                    close={() => setShowAddDialog(false)}
                    dishId={dishId}
                    setDishIngredients={setDishIngridients}
                    measurements={measurements}
                    ingredients={ingridients} />
        </>
    );
}