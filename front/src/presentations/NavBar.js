import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
    
const NavBar = () => {
    return (
        <Navbar>
            <Navbar.Brand href="/">rps.gg</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/character/ironclad">Ironclad</Nav.Link>
                    <Nav.Link href="/character/silent">Silent</Nav.Link>
                    <Nav.Link href="/character/defect">Defect</Nav.Link>
                    <Nav.Link href="/character/watcher">Watcher</Nav.Link>
                    <NavDropdown title="General" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/card">Cards</NavDropdown.Item>
                        <NavDropdown.Item href="/relic">Relics</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/* <Nav.Link href="/rest-auth" inline="true">Login</Nav.Link> */}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;