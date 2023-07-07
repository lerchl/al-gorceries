import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { DISH_INGREDIENTS, getEntities, getEntitiesWithParam, INGREDIENTS, MEASUREMENTS } from "../../ApiUtils";
import { DishIngredientDialog } from "./DishIngridientDialog";
import { DishIngridientsContainer } from "./DishIngridientsContainer";

export const DishIngredientsWidget = ({ dishId }) => {

    const [dishIngredients, setDishIngredients] = useState([]);
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [showAddDialog, setShowAddDialog] = useState(false);

    useEffect(() => getEntitiesWithParam(DISH_INGREDIENTS, setDishIngredients, dishId), [dishId]);
    useEffect(() => getEntities(MEASUREMENTS, setUnitsOfMeasurement), []);
    useEffect(() => getEntities(INGREDIENTS, setIngredients), []);

    return (
        <>
            <div className="space-between">
                <h2>Zutaten</h2>
                <button className="icon-button mb-2" title="Zutat hinzufügen" onClick={() => setShowAddDialog(true)}>
                    <PlusLg color="white" size={30} />
                </button>
            </div>
            <DishIngridientsContainer dishId={dishId} dishIngridients={dishIngredients}
                    setDishIngridients={setDishIngredients}
                    ingridients={ingredients} measurements={unitsOfMeasurement} />
            <DishIngredientDialog show={showAddDialog}
                    close={() => setShowAddDialog(false)}
                    dishId={dishId}
                    setDishIngredients={setDishIngredients}
                    measurements={unitsOfMeasurement}
                    ingredients={ingredients} />
        </>
    );
}