import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DISHES, getEntity } from "../../ApiUtils";
import Menubar from "../../Menubar";
import { DishIngridients } from './DishIngridients';

export const Dish = () => {

    const { id } = useParams();

    const [dish, setDish] = useState();

    useEffect(() => getEntity(DISHES, setDish, id), []);

    return (
        <>
            <Menubar />
            <div className="content">

                {/* Headline */}
                <h1 className="mb-4">{dish?.name}</h1>

                <Container fluid="lg">
                    <Row>
                        <Col lg={6}>
                            {/* Base data */}
                            <h2>Infos</h2>
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
                        </Col>

                        <Col lg={6}>
                            <DishIngridients dishId={id} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
