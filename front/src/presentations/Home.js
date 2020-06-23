import React from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Home = ({
    list
}) => {
    const columns = [{
        dataField: 'id',
        text: '번호',
        style: {textAlign: 'center'}
    }, {
        dataField: 'title',
        text: '제목',
        formatter: (row, cell) => {
            return <Link to={{pathname: `/${cell.id}`, search: `?title=${cell.title}&content=${cell.content}`}}>{cell.title}</Link>;
        }
    }, {
        dataField: 'created_at',
        text: '등록일',
        style: {textAlign: 'center'},
        formatter: (cell) => {
            const temp = cell.substring(0, 10);
            return temp;
        }
    }];

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
                        <BootstrapTable keyField='id' data={list} columns={columns} pagination={paginationFactory()} />
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