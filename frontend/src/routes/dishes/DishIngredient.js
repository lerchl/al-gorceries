import { Divider } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { deleteEntityAndGetEntitiesWithParam, DISH_INGREDIENTS } from "../../ApiUtils";
import { DishIngredientDialog } from "./DishIngredientDialog";

export const DishIngredient = ({ dishIngredient, setDishIngredients, dishId, last, measurements, ingredients }) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            <Row>
                <Col xs="2">{dishIngredient.amount}</Col>
                <Col xs="4" className="ellipsis">{dishIngredient.unitOfMeasurement.name}</Col>
                <Col xs="4" className="ellipsis">{dishIngredient.ingredient.name}</Col>
                <Col xs="2" className="d-flex justify-content-end">
                    <button className="icon-button" onClick={() => setShowEditDialog(true)}><PencilFill color="white" /></button>
                    <button className="icon-button ml-2" onClick={() => deleteEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, dishIngredient.id, setDishIngredients, dishId)}><TrashFill color="white" /></button>
                </Col>
            </Row>
            <DishIngredientDialog show={showEditDialog}
                    close={() => setShowEditDialog(false)}
                    dishId={dishId}
                    setDishIngredients={setDishIngredients}
                    dishIngredient={dishIngredient}
                    measurements={measurements}
                    ingredients={ingredients} />
            { !last ? <Divider className="mt-2 mb-2" /> : "" }
        </>
    );
}