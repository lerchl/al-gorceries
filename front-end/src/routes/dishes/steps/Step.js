import { Divider } from "@mui/material";
import { Col, Row } from "react-bootstrap";

export const Step = ({ step, setSteps, dishId, last }) => {

    return (
        <>
            <Row>
                <Col sm={1}>{step.index + 1 + "."}</Col>
                <Col sm={11}>{step.content}</Col>
            </Row>
            { !last ? <Divider className="mt-2 mb-2" /> : <></> }
        </>
    );

}
