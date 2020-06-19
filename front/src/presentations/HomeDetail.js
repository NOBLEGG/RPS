import React from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const HomeDetail = ({
    item
}) => {
    return (
        <div>
            <Container fluid="true">
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="#home">rps.gg</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#home">Ironclad</Nav.Link>
                                    <Nav.Link href="#link">Slient</Nav.Link>
                                    <Nav.Link href="#link">Defect</Nav.Link>
                                    <Nav.Link href="#link">Watcher</Nav.Link>
                                    <NavDropdown title="General" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Cards</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Relics</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Archivements</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                        <article>
                            <h2>{item.title}</h2>
                            <hr></hr>
                            <p>{item.content}</p>
                        </article>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <footer className="bg-dark">
                            <p>footer</p>
                        </footer>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomeDetail;