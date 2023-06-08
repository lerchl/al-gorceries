import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS } from "../../ApiUtils";

export const Household = () => {

    const { t } = useTranslation();

    const [name, setName] = useState("");

    const createHousehold = async () => {
        const res = await axios.post(`${API_URL}/${HOUSEHOLDS}`, { name: name });
        if (res.status === 201) {
            setName("");
        }
    }

    return (
        <div className="content">
            <Container fluid>
                <Row>
                    <Col sm="12" md="6" xxl="4">
                        <div className="widget">
                            <h1>{ t("household.create") }</h1>
                            <Container fluid className="overlay">
                                <Row>
                                    <TextField value={name} label={t("household.attribute.name")} onChange={e => setName(e.target.value)} className="w-100 mb-2" />
                                </Row>
                                <Row>
                                    <button type="button" onClick={createHousehold} className="custom-button primary w-100">{ t("base.action.create") }</button>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}