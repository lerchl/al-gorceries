import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const DishInfoWidget = ({ dish }) => {

    const { t } = useTranslation();

    return (
        <div className="widget">
            <h2>{ t("dish.widget.info.headline") }</h2>
            <Container fluid className="overlay">
                <Row>
                    <Col xs={6} className="bold">{ t("dish.attribute.source") }</Col>
                    <Col xs={6}><ValueOrEmpty value={dish?.source} /></Col>
                </Row>
                <Row>
                    <Col xs={6} className="bold">{ t("dish.attribute.sourceInformation") }</Col>
                    <Col xs={6}><ValueOrEmpty value={dish?.sourceInformation} /></Col>
                </Row>
                <Row>
                    <Col xs={6} className="bold">{ t("dish.attribute.prepTime") }</Col>
                    <Col xs={6}><ValueOrEmpty value={dish?.time} suffix={" " + t("base.minutes")} /></Col>
                </Row>
                <Row>
                    <Col xs={6} className="bold">{ t("dish.attribute.cost") }</Col>
                    <Col xs={6}><ValueOrEmpty value={dish?.cost} suffix="€" /></Col>
                </Row>
            </Container>
        </div>
    );
}

const ValueOrEmpty = ({ value, suffix = "" }) => {
    return value === "" || value === undefined ? <span className="d-flex justify-content-center">-</span> : value + suffix
}
