import { React, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DISHES, getEntity } from "../../ApiUtils";
import { DishInfoWidget } from "./DishInfoWidget";
import { DishIngredientsWidget } from './DishIngredientsWidget';
import { t } from "i18next";

export const Dish = () => {

    const { id } = useParams();

    const [dish, setDish] = useState();

    useEffect(() => getEntity(DISHES, setDish, id), []);

    return (
        <div className="content">
            <h1 className="mb-4">{ t("dish.details.headline") }: { dish?.name } ({ dish?.servingAmount} { dish?.servingUnitOfMeasurement.name })</h1>

            <Container>
                <Row>
                    <Col md="12" lg="6">
                        <DishInfoWidget dish={dish} />
                        {/* <div className="widget widget-pink-2">
                            <Steps dishId={id} />
                        </div> */}
                    </Col>
                    <Col md="12" lg="6">
                        <DishIngredientsWidget dishId={id} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
