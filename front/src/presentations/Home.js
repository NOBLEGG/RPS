import React from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Home = ({
    list
}) => {
    const dateFormatter = (data) => {
        return data.substring(0, 10);
    };

    const listItem = list.map((item) =>
        <tr key={item.id}>
            <th style={{textAlign: "center"}}>{item.id}</th>
            <th><Link to={{pathname: `/${item.id}`, search: `?title=${item.title}&content=${item.content}`}}>{item.title}</Link></th>
            <th style={{textAlign: "center"}}>{dateFormatter(item.created_at)}</th>
        </tr>
    );

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
                        <Table striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>번호</th>
                                    <th style={{textAlign: "center"}}>제목</th>
                                    <th style={{textAlign: "center"}}>날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listItem}
                            </tbody>
                        </Table>
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

export default Home;