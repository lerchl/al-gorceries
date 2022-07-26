import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { API_URL } from "./ApiUtils";

function Menubar() {

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
                        <Nav.Link href="/dishes">Gerichte</Nav.Link>
                        <Nav.Link href="/ingridients">Zutaten</Nav.Link>
                        <Nav.Link href="/measurements">Maßeinheiten</Nav.Link>
                        { loggedIn ? <button type="button" onClick={logout} className="custom-button secondary">Logout</button> : <></> } 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menubar;