import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { DISH_INGRIDIENTS, getEntities, getEntitiesWithParam, INGRIDIENTS, MEASUREMENTS } from "../../ApiUtils";
import { AddDishIngridientDialog } from "./AddDishIngridientDialog";
import { DishIngridient } from "./DishIngridient";

export const DishIngridients = ({ dishId }) => {

    const [dishIngridients, setDishIngridients] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [ingridients, setIngridients] = useState([]);

    const [showAddDishIngridientDialog, setShowAddDishIngridientDialog] = useState(false);

    useEffect(() => getEntitiesWithParam(DISH_INGRIDIENTS, setDishIngridients, dishId), []);
    useEffect(() => getEntities(MEASUREMENTS, setMeasurements), []);
    useEffect(() => getEntities(INGRIDIENTS, setIngridients), []);

    return (
        <>
            <div className="space-between">
                <h2>Zutaten</h2>
                <button className="icon-button mb-2" title="Zutat hinzufügen" onClick={() => setShowAddDishIngridientDialog(true)}>
                    <PlusLg color="white" size={30} />
                </button>
            </div>
            <Container fluid="lg" className="overlay">
                {
                    dishIngridients.map((dishIngridient, i) => {
                        return <DishIngridient key={dishIngridient._id} dishIngridient={dishIngridient} setDishIngridients={setDishIngridients} dishId={dishId} last={i + 1 === dishIngridients.length} measurements={measurements} ingridients={ingridients} />;
                    })
                }
            </Container>
            <AddDishIngridientDialog show={showAddDishIngridientDialog} close={() => setShowAddDishIngridientDialog(false)} dishId={dishId} setDishIngridients={setDishIngridients} measurements={measurements} ingridients={ingridients} />
        </>
    );
}