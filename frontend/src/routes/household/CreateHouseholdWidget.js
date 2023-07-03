import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS } from "../../ApiUtils";

export const CreateHouseholdWidget = ({ fetchHousehold }) => {

    const { t } = useTranslation();

    const [name, setName] = useState("");

    const createHousehold = async () => {
        await axios.post(`${API_URL}/${HOUSEHOLDS}`, { name: name });
        fetchHousehold();
    }

    return (
        <div className="widget">
            <h2>{ t("household.create") }</h2>
            <Container fluid className="overlay">
                <Row>
                    <TextField value={name} label={t("household.attribute.name")} onChange={e => setName(e.target.value)} className="w-100 mb-2" />
                </Row>
                <Row className="mt-1">
                    <button type="button" onClick={createHousehold} className="custom-button primary w-100">{ t("base.action.create") }</button>
                </Row>
            </Container>
        </div>
    )
}