import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button, ButtonGroup, Spinner } from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

const Ironclad = ({
    opinion,
    card,
    archetype,
    changeKeyword
}) => {
    function dateFormatter(str) {
        return str.substring(0, 10);
    }

    if (opinion !== undefined && card !== undefined && archetype !== undefined) {
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Row>
                                <Image id="character-img" src="../ironclad/ironclad.jpg" />
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <ListGroup as="ul">
                                        <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#682B3B' }}>
                                            <span style={{ fontWeight: '600', color: '#EACCD4' }}>팁</span>
                                            <Link to="/opinion/ironclad"><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                                        </ListGroup.Item>
                                        {opinion.map((opinion) =>
                                            <ListGroup.Item key={opinion.id} variant="secondary">
                                                <span style={{ fontSize: '1rem' }}>{opinion.writer}</span>
                                                <span style={{ float: 'right' }}>{dateFormatter(opinion.created_at)}</span>
                                                <p>{opinion.content}</p>
                                                <p style={{ margin: '0px', textAlign: 'right', fontSize: '1rem' }}>
                                                    <StarRatingComponent editing={false} starCount={5} value={opinion.score} />
                                                </p>
                                                <ButtonGroup style={{ float: 'right', height: '1rem' }}>
                                                    <Button variant="link" style={{ position: 'relative', bottom: '5px', padding: '0 .75rem' }}>
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                                            <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                                        </svg>
                                                    </Button>
                                                    <span style={{ position: 'relative', bottom: '0px' }}>{opinion.pro}</span>
                                                    <Button variant="link" style={{ position: 'relative', bottom: '5px', padding: '0 .75rem' }}>
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                                            <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                                        </svg>
                                                    </Button>
                                                    <span style={{ position: 'relative', bottom: '0px' }}>{opinion.con}</span>
                                                </ButtonGroup>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Col>
                            </Row>
                            <br />
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
                                        {card.map((card) => <ListGroup.Item key={card.eng_name}><Link to={`/card/${card.eng_name}`}>{card.name}</Link></ListGroup.Item>)}
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row>
                                <ListGroup as="ul">
                                    <ListGroup.Item><Button><Link to="/archetype/ironclad">+</Link></Button></ListGroup.Item>
                                    {archetype.map((archetype) => <ListGroup.Item key={archetype.id}>{archetype.content}</ListGroup.Item>)}
                                </ListGroup>
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
        );
    }
};

export default Ironclad;