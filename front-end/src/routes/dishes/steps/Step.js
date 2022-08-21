import { Divider } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ArrowDown, ArrowUp, PencilFill, TrashFill } from "react-bootstrap-icons";
import { API_URL, deleteEntityAndGetEntitiesWithParam, DISH_STEPS, getEntitiesWithParam, handleAnswer } from "../../../ApiUtils";
import { EditStepDialog } from "./EditStepDialog";

export const Step = ({ step, setSteps, dishId, last }) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    const moveStepUp = () => {
        step.index--;
        let url = `${API_URL}/dishSteps/moveUp/${step._id}`;
        axios.put(url, step).then(res => {
            handleAnswer(res, 200);
            getEntitiesWithParam(DISH_STEPS, setSteps, dishId);
        });
    }

    const moveStepDown = () => {
        step.index++;
        let url = `${API_URL}/dishSteps/moveDown/${step._id}`;
        axios.put(url, step).then(res => {
            handleAnswer(res, 200);
            getEntitiesWithParam(DISH_STEPS, setSteps, dishId);
        });
    }

    return (
        <>
            <Row>
                <Col sm={2}>
                    <button className="icon-button" onClick={moveStepUp} disabled={step.index === 0}><ArrowUp color="white" /></button>
                    <button className="icon-button mr-2" onClick={moveStepDown} disabled={last}><ArrowDown color="white" /></button>
                    {step.index + 1 + "."}
                </Col>
                <Col sm={8}>{step.content}</Col>
                <Col sm={2} style={{ textAlign: "right" }}>
                    <button className="icon-button ml-2" onClick={() => setShowEditDialog(true)}><PencilFill color="white" /></button>
                    <button className="icon-button ml-2" onClick={() => deleteEntityAndGetEntitiesWithParam(DISH_STEPS, step._id, setSteps, dishId)}><TrashFill color="white" /></button>
                </Col>
            </Row>
            <EditStepDialog show={showEditDialog}
                    close={() => setShowEditDialog(false)}
                    dishId={dishId}
                    setSteps={setSteps}
                    step={step} />
            { !last ? <Divider className="mt-2 mb-2" /> : <></> }
        </>
    );
}
