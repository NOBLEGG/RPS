import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, ButtonGroup, ListGroup, Spinner } from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

const RelicDetail = ({
    relic,
    opinion,
    reqPro,
    reqCon
}) => {
    let score = 0;

    if (relic.score !== 0)
        score = relic.score / relic.opinion_count;
    
    function dateFormatter(str) {
        return str.substring(0, 10);
    }

    if (JSON.stringify(relic) !== '{}' && Object.keys(relic).length !== 0) {
        let img_path = "../../relic/";
        img_path += relic.eng_name.toLowerCase();
        img_path += ".jpg";

        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Row>
                                <Image src={img_path} style={{ margin: 'auto' }} />
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <ListGroup horizontal style={{ textAlign: 'center' }}>
                                        <ListGroup.Item style={{ width: '20%', backgroundColor: '#383018', color: '#E5DDC3', fontWeight: '600', borderBottomLeftRadius: '0px' }}>이름</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '30%' }} variant="secondary">{relic.name}</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '20%', backgroundColor: '#383018', color: '#E5DDC3', fontWeight: '600' }}>등급</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '30%', borderRadius: '0px' }} variant="secondary">{relic.rarity}</ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup horizontal>
                                        <ListGroup.Item style={{ width: '20%', backgroundColor: '#383018', color: '#E5DDC3', fontWeight: '600', borderRadius: '0px', textAlign: 'center' }}>효과</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '80%', borderRadius: '0px' }} variant="secondary">{relic.effect}</ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup horizontal>
                                        <ListGroup.Item style={{ width: '20%', backgroundColor: '#383018', color: '#E5DDC3', fontWeight: '600', borderRadius: '0px', textAlign: 'center' }}>Flavor Text</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '80%', borderRadius: '0px' }} variant="secondary">{relic.flavor_text}</ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup horizontal style={{ height: '44.91px', textAlign: 'center' }}>
                                        <ListGroup.Item style={{ width: '20%', backgroundColor: '#383018', color: '#E5DDC3', fontWeight: '600', borderTopLeftRadius: '0px' }}>점수</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '80%', borderTopRightRadius: '0px', padding: '0 1.25rem' }} variant="secondary">
                                            <div style={{ marginTop: '0.25rem', fontSize: '1.2rem' }}>
                                                <StarRatingComponent 
                                                    editing={false}
                                                    starCount={5}
                                                    value={score}
                                                />
                                                <span style={{ position: 'relative', bottom: '0.6rem', fontSize: '0.6rem' }}>({score})</span>
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <ListGroup as="ul">
                                        <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#383018' }}>
                                            <span style={{ color: '#E5DDC3', fontWeight: '600' }}>Opinions</span>
                                            <Link to={{pathname: `/opinion/relic/${relic.eng_name}`}}><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                                        </ListGroup.Item>
                                        {opinion.map((opinion) =>
                                            <ListGroup.Item key={opinion.id} variant="secondary">
                                                <span style={{ fontSize: '1rem' }}>{opinion.writer}</span>
                                                <span style={{ float: 'right' }}>{dateFormatter(opinion.created_at)}</span>
                                                <p>{opinion.content}</p>
                                                <div style={{ margin: '0px', textAlign: 'right', fontSize: '1rem' }}>
                                                    <StarRatingComponent editing={false} starCount={5} value={opinion.score} />
                                                </div>
                                                <ButtonGroup style={{ float: 'right', height: '1rem' }}>
                                                    <Button variant="link" style={{ position: 'relative', bottom: '-2.5px', padding: '0 0.1rem' }} onClick={reqPro.bind(this, opinion.id)}>
                                                        <svg width="1em" height="1em" style={{ position: "relative", bottom: "0.5rem" }} viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                                            <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                                        </svg>
                                                    </Button>
                                                    <span style={{ position: 'relative', bottom: '0px', padding: '0 0.5rem' }}>{opinion.pro}</span>
                                                    <Button variant="link" style={{ position: 'relative', bottom: '-2.5px', padding: '0 0.1rem' }} onClick={reqCon.bind(this, opinion.id)}>
                                                        <svg width="1em" height="1em" style={{ position: "relative", bottom: "0.5rem" }} viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                                            <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                                        </svg>
                                                    </Button>
                                                    <span style={{ position: 'relative', bottom: '0px', padding: '0 0.5rem' }}>{opinion.con}</span>
                                                </ButtonGroup>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col></Col>
                    </Row>
                    <br />
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

export default RelicDetail;