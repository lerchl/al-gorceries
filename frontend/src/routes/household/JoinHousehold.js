import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, HOUSEHOLD_JOIN_REQUESTS, getEntities } from "../../ApiUtils";
import { compareEntities } from "../../Entity";
import { JoinHouseholdRequest } from "./JoinHouseholdRequest";

export const JoinHousehold = () => {

    const { t } = useTranslation();

    const [request, setRequest] = useState(null);

    useEffect(() => getEntities(`${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}`, setRequest), []);

    return (
        <div className="widget">
            <h1>{ t("household.join") }</h1>
            <Container fluid className="overlay">
                { request ? <OpenJoinRequest request={request} setRequest={setRequest} /> : <NewJoinRequest setRequest={setRequest} /> }
            </Container>
        </div>
    );
}

const OpenJoinRequest = ({ request, setRequest }) => {

    const { t } = useTranslation();

    return (
        <>
            <Row>
                <h2>{ t("household.openJoinRequests") }</h2>
            </Row>
            <Row className="mb-2">
                <JoinHouseholdRequest request={request} setRequest={setRequest} />
            </Row>
        </>
    );
}

const NewJoinRequest = ({ setRequest }) => {

    const { t } = useTranslation();

    const [households, setHouseholds] = useState([]);
    const [household, setHousehold] = useState();

    useEffect(() => getEntities(HOUSEHOLDS, setHouseholds), []);

    const joinHousehold = async () => {
        const res = await axios.post(`${API_URL}/${HOUSEHOLDS}/${household.id}/${HOUSEHOLD_JOIN_REQUESTS}`);
        setRequest(res.data);
    }

    return (
        <>
            <Row>
                <h2>{ t("household.newJoinRequest") }</h2>
            </Row>
            <Row>
                <Autocomplete options={households}
                                getOptionLabel={m => m?.name}
                                value={household}
                                isOptionEqualToValue={compareEntities}
                                onChange={(_event, value) => setHousehold(value)}
                                disablePortal
                                renderInput={params => <TextField {...params} label={t("household.name")} />}
                                openText={t("base.action.open")}
                                closeText={t("base.action.close")}
                                noOptionsText={t("measurement.noOptions")}
                                clearIcon={<></>}
                                className="w-100 p-0 mb-2" />
            </Row>
            <Row>
                <button type="button" onClick={joinHousehold} className="custom-button primary w-100">{ t("base.action.join") }</button>
            </Row>
        </>
    );
}
