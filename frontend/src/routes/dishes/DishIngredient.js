import { Divider } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { deleteEntityAndGetEntitiesWithParam, DISH_INGREDIENTS } from "../../ApiUtils";
import { DishIngredientDialog } from "./DishIngridientDialog";

export const DishIngredient = ({ dishIngridient, setDishIngridients, dishId, last, measurements, ingridients }) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            <Row>
                <Col xs="2">{dishIngridient.amount}</Col>
                <Col xs="4" className="ellipsis">{dishIngridient.unitOfMeasurement.name}</Col>
                <Col xs="4" className="ellipsis">{dishIngridient.ingredient.name}</Col>
                <Col xs="2" className="d-flex justify-content-end">
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