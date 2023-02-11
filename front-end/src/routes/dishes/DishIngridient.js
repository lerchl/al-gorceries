import { Divider } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { deleteEntityAndGetEntitiesWithParam, DISH_INGREDIENTS } from "../../ApiUtils";
import { EditDishIngridientDialog } from "./EditDishIngridientDialog";

export const DishIngridient = ({ dishIngridient, setDishIngridients, dishId, last, measurements, ingridients }) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            <Row>
                <Col sm={3}>{dishIngridient.amount}</Col>
                <Col sm={3}>{dishIngridient.unitOfMeasurement.name}</Col>
                <Col sm={4}>{dishIngridient.ingredient.name}</Col>
                <Col sm={2} style={{ textAlign: "right" }}>
                    <button className="icon-button" onClick={() => setShowEditDialog(true)}><PencilFill color="white" /></button>
                    <button className="icon-button ml-2" onClick={() => deleteEntityAndGetEntitiesWithParam(DISH_INGREDIENTS, dishIngridient.id, setDishIngridients, dishId)}><TrashFill color="white" /></button>
                </Col>
            </Row>
            <EditDishIngridientDialog show={showEditDialog}
                    close={() => setShowEditDialog(false)}
                    dishId={dishId}
                    setDishIngridients={setDishIngridients}
                    dishIngridient={dishIngridient}
                    measurements={measurements}
                    ingridients={ingridients} />
            { !last ? <Divider className="mt-2 mb-2" /> : "" }
        </>
    );

}