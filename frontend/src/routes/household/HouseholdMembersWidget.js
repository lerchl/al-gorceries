import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const HouseholdMembersWidget = ({ members }) => {

    const { t } = useTranslation();

    return (
        <div className="widget">
            <h2>{ t("household.members") }</h2>
            <Container fluid>
                <Row>
                    <Col xs="12" className="bold">{ t("user.attribute.email") }</Col>
                </Row>
                { members.map(member => {
                    return (
                        <Row key={member.id}>
                            <Col xs="12" className="d-flex flex-wrap align-content-center">{ member.email }</Col>
                        </Row>
                    );
                }) }
            </Container>
        </div>
    )
}