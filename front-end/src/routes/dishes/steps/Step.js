import { Divider } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";
import { EditStepDialog } from "./EditStepDialog";

export const Step = ({ step, setSteps, dishId, last }) => {

    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            <Row>
                <Col sm={1}>{step.index + 1 + "."}</Col>
                <Col sm={9}>{step.content}</Col>
                <Col sm={2} style={{ textAlign: "right" }}>
                    <button className="icon-button" onClick={() => setShowEditDialog(true)}><PencilFill color="white" /></button>
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
