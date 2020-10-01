import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, ButtonGroup, ListGroup, Spinner } from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

const CardDetail = ({
    card,
    opinion,
    reqPro,
    reqCon
}) => {
    let score = 0;

    if (card.score !== 0)
        score = card.score / card.opinion_count;

    function dateFormatter(str) {
        return str.substring(0, 10);
    }

    function secondRow() {
        return (
            <Row>
                <Col>
                    <ListGroup horizontal style={{ textAlign: 'center' }}>
                        <ListGroup.Item style={{ width: '20%', backgroundColor: bgColor, color: textColor, fontWeight: '600', borderBottomLeftRadius: '0px' }}>이름</ListGroup.Item>
                        <ListGroup.Item style={{ width: '30%' }} variant="secondary">{card.name}</ListGroup.Item>
                        <ListGroup.Item style={{ width: '20%', backgroundColor: bgColor, color: textColor, fontWeight: '600' }}>비용</ListGroup.Item>
                        <ListGroup.Item style={{ width: '30%', borderBottomRightRadius: '0px' }} variant="secondary">{card.cost}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal style={{ textAlign: 'center' }}>
                        <ListGroup.Item style={{ width: '20%', backgroundColor: bgColor, color: textColor, fontWeight: '600', borderRadius: '0px' }}>타입</ListGroup.Item>
                        <ListGroup.Item style={{ width: '30%' }} variant="secondary">{card.kind}</ListGroup.Item>
                        <ListGroup.Item style={{ width: '20%', backgroundColor: bgColor, color: textColor, fontWeight: '600' }}>등급</ListGroup.Item>
                        <ListGroup.Item style={{ width: '30%', borderRadius: '0px' }} variant="secondary">{card.rarity}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal>
                        <ListGroup.Item style={{ width: '20%', backgroundColor: bgColor, color: textColor, fontWeight: '600', borderRadius: '0px', textAlign: 'center' }}>효과</ListGroup.Item>
                        <ListGroup.Item style={{ width: '80%', borderRadius: '0px' }} variant="secondary">{card.effect}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal style={{ height: '44.91px', textAlign: 'center' }}>
                        <ListGroup.Item style={{ width: '20%', backgroundColor: bgColor, color: textColor, fontWeight: '600', borderTopLeftRadius: '0px' }}>점수</ListGroup.Item>
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
        )
    }

    let bgColor = "";
    let textColor = "";

    if (card.subject === "ironclad") {
        bgColor = "#682B3B";
        textColor = "#EACCD4";
    } else if (card.subject === "silent") {
        bgColor = "#606C54";
        textColor = "#DFE3DB";
    } else if (card.subject === "defect") {
        bgColor = "#586983";
        textColor = "#DCE1E8";
    }

    if (JSON.stringify(card) !== '{}' && Object.keys(card).length !== 0) {
        let img_path = "../../" + card.subject + "/";
        img_path += card.eng_name.toLowerCase();
        img_path += ".jpg";

        if (opinion.length === 0) {
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
                                {secondRow()}
                                <br />
                                <Row>
                                    <Col>
                                        <ListGroup as="ul">
                                            <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: bgColor }}>
                                                <span style={{ fontWeight: '600', color: textColor }}>Opinions</span>
                                                <Link to={{pathname: `/opinion/card/${card.subject}/${card.eng_name}`}}><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item variant="secondary" style={{ height: '20rem', textAlign: 'center' }}>
                                                <p style={{ padding: '1em', fontSize: '1rem' }}>바로 윗 줄에 있는 + 버튼을 눌러 첫 의견을 등록해 주세요!</p>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <footer>
                                    <p></p>
                                </footer>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        } else {
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
                                {secondRow()}
                                <br />
                                <Row>
                                    <Col>
                                        <ListGroup as="ul">
                                            <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: bgColor }}>
                                                <span style={{ fontWeight: '600', color: textColor }}>Opinions</span>
                                                <Link to={{pathname: `/opinion/card/${card.subject}/${card.eng_name}`}}><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
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
                                <footer>
                                    <p></p>
                                </footer>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    } else {
        return (
            <div className="spin">
                <Spinner animation="border" style={{ position: 'relative', top: '40%' }}></Spinner>
            </div>
        )
    }
};

export default CardDetail;
