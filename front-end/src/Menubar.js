import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { API_URL } from "./ApiUtils";

function Menubar() {

    const { t } = useTranslation();
    const [loggedIn, setLoggedIn] = useState(false);

    async function isLoggedIn() {
        return axios.get(API_URL + "/loggedIn");
    }

    useEffect(() => isLoggedIn().then(res => setLoggedIn(res.data)), []);

    const logout = () => {
        axios.post(API_URL + "/logout").finally(() => window.location.reload());
    }

    return (
        <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Al Gorceries</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dishes">{t("dish.headline")}</Nav.Link>
                        <Nav.Link href="/ingridients">{t("ingridient.headline")}</Nav.Link>
                        <Nav.Link href="/measurements">{t("measurement.headline")}</Nav.Link>
                        <Nav.Link href="/seasons">{t("season.headline")}</Nav.Link>
                        { loggedIn ? <button type="button" onClick={logout} className="custom-button secondary">Logout</button> : <></> } 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menubar;