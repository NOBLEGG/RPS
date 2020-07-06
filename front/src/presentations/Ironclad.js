import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Ironclad = () => {
    return (
        <div>
            <Container fluid="true">
                <Row>
                    <Col></Col>
                    <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                        <Image id="character-img" src="ironclad.jpg" roundedCircle />
                        <Link to="/opinion/ironclad">상세설명</Link>
                        <Link to="/archetype/ironclad">Archetype</Link>
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

export default Ironclad;