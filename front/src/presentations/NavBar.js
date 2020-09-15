import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
    
const NavBar = () => {
    function getCookie(cookieName) {
        cookieName += "=";
        const arr = decodeURIComponent(document.cookie).split(';');

        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i];
            while (temp.charAt(0) == ' ') temp = temp.substring(1);
            if (temp.indexOf(cookieName) == 0)
                return temp.substring(cookieName.length, temp.length);
        }

        return "";
    }

    const token = getCookie('token');

    if (token === "") {
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
                    <Nav.Link href="/login" inline="true">로그인</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    } else {
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
                    {/* <Nav.Link href="/" inline="true">사용자명</Nav.Link> */}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;