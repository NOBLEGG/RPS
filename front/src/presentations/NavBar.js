import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
    
const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">rps.gg</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/ironclad">Ironclad</Nav.Link>
                    <Nav.Link href="#link">Slient</Nav.Link>
                    <Nav.Link href="#link">Defect</Nav.Link>
                    <Nav.Link href="#link">Watcher</Nav.Link>
                    <NavDropdown title="General" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/card">Cards</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Relics</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Archivements</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>  
    );
}

export default NavBar;