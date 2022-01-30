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

async function getDishList(date, setDishList) {
    const res = await axios.get(API_URL + DISH_LIST + `/${date.getFullYear()}/${getWeekNumber(date)}`);
    if (res.status === 204) {
        setDishList();
    } else {
        setDishList(res.data);
    }
}

export const Index = () => {

    const [date, setDate] = useState(new Date());
    const [dishList, setDishList] = useState();

    useEffect(() => getDishList(date, setDishList), []);

    function changeWeek(days) {
        setDate(new Date(date.setDate(date.getDate() + days)));
        getDishList(date, setDishList);
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
                                <Button className="custom-button" title="Woche zurück" onClick={() => changeWeek(-7)}><ChevronLeft /></Button>
                                <Button className="custom-button">KW{formatWeekNumber(getWeekNumber(date))}</Button>
                                <Button className="custom-button" title="Woche vor" onClick={() => changeWeek(7)}><ChevronRight /></Button>
                            </ButtonGroup>
                            { !dishList && <GenerateDishListButton date={date} getDishList={getDishList} setDishList={setDishList} /> }
                        </Col>
                    </Row>
                </Container>
                <Divider className="mb-3 mt-3" />
                { dishList && <DishesOfDishList dishList={dishList} setDishList={setDishList} /> }
            </div>
        </>
    );
}
