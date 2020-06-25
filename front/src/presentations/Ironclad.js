import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const Ironclad = ({

}) => {
    return (
        <div>
            <Container fluid="true">
                <Row>
                    <Col></Col>
                    <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                        <Image id="character-img" src="ironclad.jpg" roundedCircle />
                        
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