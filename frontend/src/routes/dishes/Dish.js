import { React, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DISHES, getEntity } from "../../ApiUtils";
import Menubar from "../../Menubar";
import { DishInfos } from "./DishInfos";
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
                            <div className="widget widget-pink-2">
                                <DishInfos dish={dish} />
                            </div>
                            {/* <div className="widget widget-pink-2">
                                <Steps dishId={id} />
                            </div> */}
                        </Col>

                        <Col lg={6}>
                            <div className="widget widget-pink-2">
                                <DishIngridients dishId={id} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
