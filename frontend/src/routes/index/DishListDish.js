import axios from 'axios';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DashLg, PlusLg } from "react-bootstrap-icons";
import { API_URL, DISH_LIST_DISH } from "../../ApiUtils";

export const DishListDish = ({ dishListDish, setDishListDishes }) => {

    const dish = dishListDish.dish;

    const changeAmount = adjustment => {
        // calculate new amount
        const amount = dishListDish.amount + adjustment;

        // check if amount is valid
        if (amount < 0) {
            return;
        }

        // update dish list dish
        updateDishListDish(amount);
    }

    const updateDishListDish = async amount => {
        const res = await axios.put(`${API_URL}/${DISH_LIST_DISH}/${dishListDish.id}`, { "amount": amount });
        setDishListDishes(dishListDishes => {
            // create new dish list where the updated dish list dish is replaced
            const newDishList = dishListDishes.map(dishListDish => {
                if (dishListDish.id === res.data.id) {
                    return res.data;
                } else {
                    return dishListDish;
                }
            });

            // return new dish list
            return newDishList;
        });
    }

    return (
        <Container fluid className="overlay dish-list-dish">
            <Row>
                <Col xs="7" sm="11" className="display">
                    { dish.name } ({ dish.servingAmount } { dish.servingUnitOfMeasurement.name })
                </Col>
                <Col xs="5" sm="1" className="buttons">
                    <button type="button" onClick={() => changeAmount(-1)} className="custom-button mr-2"><DashLg /></button>
                    { dishListDish.amount }
                    <button type="button" onClick={() => changeAmount(1)} className="custom-button ml-2"><PlusLg /></button>
                </Col>
            </Row>
        </Container>
    );
}
