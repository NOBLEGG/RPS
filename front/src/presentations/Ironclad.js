import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button, Spinner } from 'react-bootstrap';

const Ironclad = ({
    opinion,
    archetype
}) => {
    if (opinion !== undefined && archetype !== undefined) {
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Image id="character-img" src="ironclad/ironclad.jpg" />
                            <ListGroup as="ul">
                                <ListGroup.Item><Button><Link to="/opinion/ironclad">+</Link></Button></ListGroup.Item>
                                {opinion.map((opinion) => <ListGroup.Item key={opinion.id}>{opinion.content}</ListGroup.Item>)}
                            </ListGroup>
                            
                            <ListGroup as="ul">
                                <ListGroup.Item><Button><Link to="/archetype/ironclad">+</Link></Button></ListGroup.Item>
                                {archetype.map((archetype) => <ListGroup.Item key={archetype.id}>{archetype.content}</ListGroup.Item>)}
                            </ListGroup>
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
    } else {
        return (
            <div>
                <Spinner animation="border"></Spinner>
            </div>
        )
    }
};

export default Ironclad;