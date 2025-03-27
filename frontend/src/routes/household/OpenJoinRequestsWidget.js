import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, HOUSEHOLD_JOIN_REQUESTS } from "../../ApiUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons";

const fetchJoinRequests = async (householdId, setJoinRequests) => {
    const res = await axios.get(`${API_URL}/${HOUSEHOLDS}/${householdId}/${HOUSEHOLD_JOIN_REQUESTS}`);
    setJoinRequests(res.data);
}


const acceptJoinRequest = async (request, householdId, setJoinRequests) => {
    await axios.post(`${API_URL}/${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}/${request.id}/accept`);
    fetchJoinRequests(householdId, setJoinRequests);
}

const rejectJoinRequest = async (request, householdId, setJoinRequests) => {
    await axios.post(`${API_URL}/${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}/${request.id}/reject`);
    fetchJoinRequests(householdId, setJoinRequests);
}

export const OpenJoinRequestsWidget = ({ householdId }) => {

    const { t } = useTranslation();

    const [joinRequests, setJoinRequests] = useState([]);

	// FIXME
	// eslint-disable-next-line
    useEffect(() => fetchJoinRequests(householdId, setJoinRequests), []);

    return (
        <div className="widget">
            <h2>{t("household.openJoinRequests")}</h2>
            <Container fluid className="overlay">
                {
                    joinRequests.length > 0 ? <Table joinRequests={joinRequests} /> : <EmptyMessage />
                }
            </Container>
        </div>
    )
}

const Table = ({ joinRequests }) => {

    const { t } = useTranslation();

    return (
        <>
            <Row>
                <Col xs="8" className="bold">{ t("user.attribute.email") }</Col>
                <Col xs="4"></Col>
            </Row>
            {
                joinRequests.map(request => {
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
                })
            }
        </>
    )
}

const EmptyMessage = () => {

    const { t } = useTranslation();

    return (
        <Row>
            <Col xs="12" className="italic d-flex flex-wrap justify-content-center align-content-center">
                {
                    t("household.noOpenJoinRequests")
                }
            </Col>
        </Row>
    )
}
