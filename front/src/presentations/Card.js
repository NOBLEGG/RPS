import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Spinner } from 'react-bootstrap';

const Card = ({
    cards,
    changeKeyword
}) => {
    if (cards !== undefined) {
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Row>
                                <Col>
                                    <p className="checkbox-label">등급</p>
                                    <div>
                                        <input type="checkbox" />
                                        <label className="checkbox-label">일반</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <label className="checkbox-label">특별</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" />
                                        <label className="checkbox-label">희귀</label>
                                    </div>
                                    <p className="checkbox-label">키워드</p>
                                    <div>
                                        <input type="checkbox" onClick={changeKeyword.bind(this, 'artifact')} />
                                        <label className="checkbox-label">인공물</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" onClick={changeKeyword.bind(this, 'block')} />
                                        <label className="checkbox-label">방어도</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" onClick={changeKeyword.bind(this, 'dexterity')} />
                                        <label className="checkbox-label">민첩</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" onClick={changeKeyword.bind(this, 'ethereal')} />
                                        <label className="checkbox-label">휘발성</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" onClick={changeKeyword.bind(this, 'vulnerable')} />
                                        <label className="checkbox-label">취약</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" onClick={changeKeyword.bind(this, 'weak')} />
                                        <label className="checkbox-label">약화</label>
                                    </div>
                                </Col>
                                <Col>
                                    <ListGroup as="ul">
                                        {cards.map((cards) => <ListGroup.Item key={cards.eng_name}><Link to={`/card/${cards.eng_name}`}>{cards.name}</Link></ListGroup.Item>)}
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
            <div>
                <Spinner animation="border"></Spinner>
            </div>
        )
    }
    
};

export default Card;