import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button, Spinner } from 'react-bootstrap';

const CardDetail = ({
    card,
    opinion
}) => {
    const temp = {card};
    console.log(temp);
    
    if (JSON.stringify(temp.card) !== '{}' && Object.keys(temp.card).length !== 0) {
        let img_path = "../" + temp.card.subject + "/";
        img_path += temp.card.eng_name.toLowerCase();
        img_path += ".jpg";
    
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Image src={img_path} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {temp.card.name}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <ListGroup as="ul">
                                        <ListGroup.Item><Button><Link to={`/opinion/${temp.card.eng_name}`}>+</Link></Button></ListGroup.Item>
                                        {opinion.map((opinion) => <ListGroup.Item key={opinion.id}>{opinion.content}</ListGroup.Item>)}
                                    </ListGroup>
                                </Col>
                            </Row>
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
            <div className="spin">
                <Spinner animation="border" style={{ position: 'relative', top: '40%' }}></Spinner>
            </div>
        )
    }
};

export default CardDetail;