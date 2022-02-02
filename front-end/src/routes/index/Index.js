import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { API_URL, DISH_LIST } from "../../ApiUtils";
import "../../css/index.css";
import "../../css/theme.css";
import { formatWeekNumber, getWeekNumber } from "../../DateUtils";
import Menubar from '../../Menubar';
import { DishesOfDishList } from "./DishesOfDishList";
import { GenerateDishListButton } from "./GenerateDishListButton";
import { ShoppingList } from "./ShoppingList";

async function getDishList(date, setDishList) {
    const res = await axios.get(API_URL + DISH_LIST + `/${date.getFullYear()}/${getWeekNumber(date)}`);
    if (res.status === 204) {
        setDishList();
    } else {
        setDishList(res.data);
    }
}

export const Index = () => {

    const [viewDishSelection, setViewDishSelection] = useState(true);

    const [date, setDate] = useState(new Date());
    const [dishList, setDishList] = useState();

    useEffect(() => getDishList(date, setDishList), []);

    function changeWeek(weeks) {
        setDate(new Date(date.setDate(date.getDate() + 7 * weeks)));
        getDishList(date, setDishList);
        setViewDishSelection(true);
    }

    function navigationButton() {
        if (!dishList) {
            return <GenerateDishListButton date={date} getDishList={getDishList} setDishList={setDishList} />;
        } else if (viewDishSelection) {
            return <button onClick={() => setViewDishSelection(false)} className="custom-button primary ml-2" style={{ width: "100%" }}>Einkaufsliste</button>;
        } else {
            return <button onClick={() => setViewDishSelection(true)} className="custom-button primary ml-2" style={{ width: "100%" }}>Gerichteauswahl</button>;
        }
    }

    function content() {
        if (viewDishSelection) {
            if (dishList) {
                return <DishesOfDishList dishList={dishList} setDishList={setDishList} />;
            } else {
                return <p style={{ textAlign: "center" }}>Noch keine Gerichte generiert...</p>;
            }
        } else {
            return <ShoppingList dishes={dishList.selectedDishes} />;
        }
    }

    return (
        <>
            <Menubar />
            <div className="content">
                <Container fluid>
                    <Row>
                        <Col lg={8}>
                            <h1>Gerichte diese Woche</h1>
                        </Col>
                        <Col lg={4} className="space-between">
                            <ButtonGroup>
                                <Button className="custom-button" title="Woche zurück" onClick={() => changeWeek(-1)}><ChevronLeft /></Button>
                                <Button className="custom-button custom-button-no-hover">KW{formatWeekNumber(getWeekNumber(date))}</Button>
                                <Button className="custom-button" title="Woche vor" onClick={() => changeWeek(1)}><ChevronRight /></Button>
                            </ButtonGroup>
                            { navigationButton() }
                        </Col>
                    </Row>
                </Container>
                <Divider className="mb-3 mt-3" />
                { content() }
            </div>
        </>
    );
}
