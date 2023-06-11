import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CheckCircle, DoorOpen, XCircle } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, HOUSEHOLD_JOIN_REQUESTS, USERS } from "../../ApiUtils";
import { CustomSpinner } from "../../CustomSpinner";
import { JoinHousehold } from "./JoinHousehold";

export const Household = () => {

    const [loading, setLoading] = useState(true);
    const [household, setHousehold] = useState(null);

    const fetchHousehold = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`${API_URL}/${HOUSEHOLDS}/current`);
            setHousehold(res.data);
        } catch (e) {
            // noop
        }

        setLoading(false);
    }

    useEffect(() => fetchHousehold(), []);

    const content = () => {
        console.log(loading);
        if (!loading) {
            console.log(household)
            if (household) {
                return <WithHousehold household={household} setHousehold={setHousehold} />;
            } else {
                return <WithoutHousehold />;
            }
        }

        return <CustomSpinner />;
    }

    return (
        <div className="content">
            { content() }
        </div>
    );
}

const WithHousehold = ({ household, setHousehold }) => {

    const { t } = useTranslation();

    const [joinRequests, setJoinRequests] = useState([]);

    const fetchJoinRequests = async () => {
        const res = await axios.get(`${API_URL}/${HOUSEHOLDS}/${household.id}/${HOUSEHOLD_JOIN_REQUESTS}`);
        setJoinRequests(res.data);
    }

    useEffect(() => fetchJoinRequests(), []);

    const acceptJoinRequest = async (request) => {
        await axios.post(`${API_URL}/${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}/${request.id}/accept`);
        fetchJoinRequests();
    }

    const rejectJoinRequest = async (request) => {
        await axios.post(`${API_URL}/${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}/${request.id}/reject`);
        fetchJoinRequests();
    }

    const leaveHousehold = async () => {
        await axios.post(`${API_URL}/${USERS}/household/current/leave`);
        setHousehold(null);
    }

    return (
        <>
            <h1>{ household.name }</h1>
            <div className="widget">
                <h2>{ t("household.members") }</h2>
                <Container fluid className="overlay">
                    <Row>
                        <Col xs="8" className="bold">{ t("user.attribute.email") }</Col>
                        <Col xs="4"></Col>
                    </Row>
                    { household.users.map(member => {
                        return (
                            <Row key={member.id}>
                                <Col xs="12" className="d-flex flex-wrap align-content-center">{ member.email }</Col>
                            </Row>
                        );
                    }) }
                </Container>
            </div>
            <div className="widget">
                <h2>{ t("household.openJoinRequests") }</h2>
                <Container fluid className="overlay">
                    <Row>
                        <Col xs="8" className="bold">{ t("user.attribute.email") }</Col>
                        <Col xs="4"></Col>
                    </Row>
                    { joinRequests.map(request => {
                        return (
                            <Row key={request.id}>
                                <Col xs="8" className="d-flex flex-wrap align-content-center">
                                    { request.user.email }
                                </Col>
                                <Col xs="4" className="d-flex flex-wrap align-content-center justify-content-end">
                                    <button type="button" onClick={() => acceptJoinRequest(request)} className="icon-button mr-2" title={t("base.action.accept")} style={{ fontSize: "28px" }}><CheckCircle /></button>
                                    <button type="button" onClick={() => rejectJoinRequest(request)} className="icon-button" title={t("base.action.reject")} style={{ fontSize: "28px" }}><XCircle /></button>
                                </Col>
                            </Row>
                        );
                    }) }
                </Container>
                { console.log(joinRequests) }
            </div>
            <button type="button" onClick={leaveHousehold} className="custom-button danger-button w-100"><DoorOpen /> { t("household.leave") }</button>
        </>
    );
}

const WithoutHousehold = () => {

    const { t } = useTranslation();

    const [name, setName] = useState("");

    const createHousehold = async () => {
        const res = await axios.post(`${API_URL}/${HOUSEHOLDS}`, { name: name });
        if (res.status === 201) {
            setName("");
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md="12" lg="6">
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
                <Col md="12" lg="6">
                    <JoinHousehold />
                </Col>
            </Row>
        </Container>
    );
}
