import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
    
const NavBar = ({
    isLogin
}) => {
    function userMenu(isLogin) {
        if (isLogin !== true) {
            return (
                <Nav.Link href="/login" inline="true">사용자 메뉴</Nav.Link>
            )
        } else {
            return (
                <NavDropdown title="사용자 메뉴">
                    <NavDropdown.Item href="/updatepw">비밀번호 변경</NavDropdown.Item>
                    <NavDropdown.Item href="/logout">로그아웃</NavDropdown.Item>
                    <NavDropdown.Item href="/deleteuser">회원 탈퇴</NavDropdown.Item>
                </NavDropdown>
            )
        }
    }

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
                    <NavDropdown title="General">
                        <NavDropdown.Item href="/card">Cards</NavDropdown.Item>
                        <NavDropdown.Item href="/relic">Relics</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {userMenu(isLogin)}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
