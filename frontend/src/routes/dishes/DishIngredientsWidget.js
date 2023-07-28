import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { DISH_INGREDIENTS, getEntities, getEntitiesWithParam, INGREDIENTS, MEASUREMENTS } from "../../ApiUtils";
import { DishIngredientDialog } from "./DishIngridientDialog";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DishIngredient } from "./DishIngredient";

export const DishIngredientsWidget = ({ dishId }) => {

    const { t } = useTranslation()

    const [dishIngredients, setDishIngredients] = useState([]);
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [showAddDialog, setShowAddDialog] = useState(false);

    useEffect(() => getEntitiesWithParam(DISH_INGREDIENTS, setDishIngredients, dishId), [dishId]);
    useEffect(() => getEntities(MEASUREMENTS, setUnitsOfMeasurement), []);
    useEffect(() => getEntities(INGREDIENTS, setIngredients), []);

    return (
        <div className="widget">
            <div className="space-between">
                <h2>{ t("dish.ingredients.headline") }</h2>
                <button className="icon-button mb-2" title="Zutat hinzufügen" onClick={() => setShowAddDialog(true)}>
                    <PlusLg color="white" size={30} />
                </button>
            </div>
            <Container>
                {
                    dishIngredients.length === 0 ?
                            <EmptyMessage /> : <Ingredients dishIngredients={dishIngredients}
                                                            setDishIngredients={setDishIngredients}
                                                            ingredients={ingredients}
                                                            unitsOfMeasurement={unitsOfMeasurement}
                                                            dishId={dishId} />
                }
            </Container>
            <DishIngredientDialog show={showAddDialog}
                    close={() => setShowAddDialog(false)}
                    dishId={dishId}
                    setDishIngredients={setDishIngredients}
                    measurements={unitsOfMeasurement}
                    ingredients={ingredients} />
        </div>
    );
}

const EmptyMessage = () => {

    const { t } = useTranslation()

    return (
        <p style={{ textAlign: "center" }}>{ t("dish.ingredients.noIngredients") }</p>
    )
}

const Ingredients = ({ dishIngredients, setDishIngredients, ingredients, unitsOfMeasurement, dishId }) => {
    return (
        dishIngredients.map((dishIngridient, i) => {
            return <DishIngredient key={dishIngridient.id} dishIngridient={dishIngridient} setDishIngridients={setDishIngredients} dishId={dishId} last={i + 1 === dishIngredients.length} measurements={unitsOfMeasurement} ingridients={ingredients} />;
        })
    );
}
