import { Container } from "@mui/material";
import { DishIngridient } from "./DishIngridient";

export const DishIngridientsContainer = ({dishId, dishIngridients, setDishIngridients, measurements, ingridients}) => {

    function content() {
        if (dishIngridients.length === 0) {
            return <p style={{ textAlign: "center" }}>Noch keine Gerichte ausgewählt...</p>;
        } else {
            return (
                dishIngridients.map((dishIngridient, i) => {
                    return <DishIngridient key={dishIngridient._id} dishIngridient={dishIngridient} setDishIngridients={setDishIngridients} dishId={dishId} last={i + 1 === dishIngridients.length} measurements={measurements} ingridients={ingridients} />;
                })
            );
        }
    }

    return (
        <Container fluid="lg" className="overlay">
            { content() }
        </Container>
    );

}