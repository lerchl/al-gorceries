import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, HOUSEHOLD_JOIN_REQUESTS } from "../../ApiUtils";
import { XCircle } from "react-bootstrap-icons";

export const JoinHouseholdRequest = ({ request, setRequest }) => {

    const { t } = useTranslation();

    const withdrawRequest = async () => {
        await axios.delete(`${API_URL}/${HOUSEHOLDS}/${HOUSEHOLD_JOIN_REQUESTS}/${request.id}`);
        setRequest(null);
    }

    return (
        <Container fluid>
            <Row>
                <Col xs="10">
                    <Container fluid>
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
                    <button type="button" onClick={withdrawRequest} className="icon-button" title={t("household.joinRequest.withdraw")} style={{ width: "48px", fontSize: "28px" }}><XCircle /></button>
                </Col>
            </Row>
        </Container>
    );
}