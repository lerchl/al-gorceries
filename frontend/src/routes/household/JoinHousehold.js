import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, HOUSEHOLD_JOIN_REQUESTS, getEntities } from "../../ApiUtils";

export const JoinHousehold = () => {

    const { t } = useTranslation();

    const [households, setHouseholds] = useState([]);
    const [household, setHousehold] = useState();

    useEffect(() => getEntities(HOUSEHOLDS, setHouseholds), []);

    const joinHousehold = async () => {
        const res = await axios.post(`${API_URL}/${HOUSEHOLDS}/${household.id}/${HOUSEHOLD_JOIN_REQUESTS}`);
    }

    return (
        <div className="widget">
            <h1>{ t("household.join") }</h1>
            <Container fluid className="overlay">
                <Row>
                    <Autocomplete options={households}
                                  getOptionLabel={s => s.name}
                                  onChange={(_event, value) => setHousehold(value)}
                                  disablePortal
                                  renderInput={params => <TextField {...params} label={t("household.name")} />}
                                  openText={t("base.action.open")}
                                  closeText={t("base.action.close")}
                                  noOptionsText={t("household.noOptions")}
                                  clearIcon={<></>}
                                  className="custom-button primary w-100 mb-2" />
                </Row>
                <Row>
                    <button type="button" onClick={joinHousehold} className="custom-button primary w-100">{ t("base.action.join") }</button>
                </Row>
            </Container>
        </div>
    );
}
