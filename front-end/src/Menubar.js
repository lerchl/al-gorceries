import { Container, Nav, Navbar } from "react-bootstrap";

function Menubar() {
    return (
        <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Al Gorceries</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/measurements">Maßeinheiten</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    );
}

export default Menubar;