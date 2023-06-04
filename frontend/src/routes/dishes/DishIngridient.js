import { Divider } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { deleteEntityAndGetEntitiesWithParam, DISH_INGREDIENTS } from "../../ApiUtils";
import { DishIngredientDialog } from "./DishIngridientDialog";

export const DishIngridient = ({ dishIngridient, setDishIngridients, dishId, last, measurements, ingridients }) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            <Row>
                <Col xs={4} sm={3}>{dishIngridient.amount}</Col>
                <Col xs={4} sm={3}>{dishIngridient.unitOfMeasurement.name}</Col>
                <Col xs={4} sm={4}>{dishIngridient.ingredient.name}</Col>
                <Col xs={12} sm={2}>
                    <button className="icon-button" onClick={() => setShowEditDialog(true)}><PencilFill color="white" /></button>
                    <button className="icon-button ml-2" onClick={() => deleteEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, dishIngridient.id, setDishIngridients, dishId)}><TrashFill color="white" /></button>
                </Col>
            </Row>
            <DishIngredientDialog show={showEditDialog}
                    close={() => setShowEditDialog(false)}
                    dishId={dishId}
                    setDishIngredients={setDishIngridients}
                    dishIngredient={dishIngridient}
                    measurements={measurements}
                    ingredients={ingridients} />
            { !last ? <Divider className="mt-2 mb-2" /> : "" }
        </>
    );

}