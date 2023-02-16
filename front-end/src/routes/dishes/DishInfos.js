import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export const DishInfos = ({ dish }) => {
    return (
        <>
            <h2>Infos</h2>
            <Container fluid className="overlay">
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>Name</Col>
                    <Col xs={12} sm={8} md={8} lg={8} className="bold">{dish?.name}</Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>Quelle</Col>
                    <Col xs={12} sm={8} md={8} lg={8} className="bold">{dish?.source}</Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>Quellzusatz</Col>
                    <Col xs={12} sm={8} md={8} lg={8} className="bold">{dish?.sourceInformation}</Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>Zubereitungszeit</Col>
                    <Col xs={12} sm={8} md={8} lg={8} className="bold">{dish?.time} Minuten</Col>
                </Row>
                <Row>
                    <Col xs={12} sm={4} md={4} lg={4}>Kosten</Col>
                    <Col xs={12} sm={8} md={8} lg={8} className="bold">{dish?.cost}€</Col>
                </Row>
            </Container>
        </>
    );
}