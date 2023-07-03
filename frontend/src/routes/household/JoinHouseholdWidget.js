import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, HOUSEHOLD_JOIN_REQUESTS, getEntities } from "../../ApiUtils";
import { compareEntities } from "../../Entity";
import { XCircle } from "react-bootstrap-icons";

export const JoinHouseholdWidget = () => {

    const [request, setRequest] = useState(null);

    useEffect(() => getEntities(`${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}`, setRequest), []);

    return request ? <OpenJoinRequest request={request} setRequest={setRequest} /> : <NewJoinRequest setRequest={setRequest} />
}

const OpenJoinRequest = ({ request, setRequest }) => {

    const { t } = useTranslation();

    return (
        <div className="widget">
            <h2>{ t("household.openJoinRequest") }</h2>
            <Container fluid className="overlay">
                <Row>
                    <JoinHouseholdRequest request={request} setRequest={setRequest} />
                </Row>
            </Container>
        </div>
    );
}

const JoinHouseholdRequest = ({ request, setRequest }) => {

    const { t } = useTranslation();

    const withdrawRequest = async () => {
        await axios.delete(`${API_URL}/${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}/${request.id}`);
        setRequest(null);
    }

    return (
        <Container fluid>
            <Row>
                <Col xs="10">
                    <Container fluid className="p-0">
                        <Row>
                            <Col xs="12" sm="5" className="bold">{ t("household.name") }</Col>
                            <Col xs="12" sm="7">{ request?.household.name }</Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="5" className="bold">{ t("household.joinRequest.attribute.createdAt") }</Col>
                            <Col xs="12" sm="7">{ request && new Date(request.createdAt).toLocaleString() }</Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs="2" className="d-flex justify-content-end">
                    <button type="button" onClick={withdrawRequest} className="icon-button" title={t("household.joinRequest.withdraw")} style={{ width: "48px", fontSize: "28px" }}>
                        <XCircle />
                    </button>
                </Col>
            </Row>
        </Container>
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
        <div className="widget">
            <h2>{ t("household.newJoinRequest") }</h2>
            <Container fluid className="overlay">
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
                <Row className="mt-1">
                    <button type="button" onClick={joinHousehold} className="custom-button primary w-100">{ t("base.action.join") }</button>
                </Row>
            </Container>
        </div>
    )
}
