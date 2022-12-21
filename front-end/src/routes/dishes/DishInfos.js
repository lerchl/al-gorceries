import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const DishInfos = ({ dish }) => {
    return (
        <Container fluid className="overlay">
            <Row sm={12}>
                <Col>Quelle</Col>
                <Col className="bold">{dish?.source}</Col>
            </Row>
            <Row sm={12}>
                <Col>Quellzusatz</Col>
                <Col className="bold">{dish?.sourceInformation}</Col>
            </Row>
            <Row sm={12}>
                <Col>Zubereitungszeit</Col>
                <Col className="bold">{dish?.prepTime} Minuten</Col>
            </Row>
            <Row sm={12}>
                <Col>Kosten</Col>
                <Col className="bold">{dish?.cost}€</Col>
            </Row>
        </Container>
    );
}