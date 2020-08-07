import React from 'react';
import { Pagination, Container, Row, Col, Form, Button, ButtonGroup, ListGroup, Spinner } from 'react-bootstrap';

import { useForm, Controller } from 'react-hook-form';

import StarRatingComponent from 'react-star-rating-component';

const Archetype = ({
    archetype,
    postForm,
    reqPro,
    reqCon,
    archetypePerPage,
    currentPage,
    handleClick
}) => {
    const { handleSubmit, control, register } = useForm();

    const submitMessage = () => {
        alert("등록이 완료되었습니다. 데이터베이스 상황에 따라 화면에 표시되기까지 시간이 걸릴 수 있습니다.");
        window.location.reload();
    }

    function dateFormatter(str) {
        return str.substring(0, 10);
    }

    if (archetype !== undefined) {
        const indexOfLastArchetype = currentPage * archetypePerPage;
        const indexOfFirstArchetype = indexOfLastArchetype - archetypePerPage;
        const currentArchetype = archetype.slice(indexOfFirstArchetype, indexOfLastArchetype);

        let items = [];
        for (let number = 1; number <= Math.ceil(archetype.length / archetypePerPage); number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={handleClick.bind(this, number)}>
                    {number}
                </Pagination.Item>
            );
        }

        const paginationBasic = (
            <div>
                <Pagination size="sm">{items}</Pagination>
            </div>
        );

        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Form onSubmit={handleSubmit(postForm)}>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="작성자" />
                                                }
                                                name="writer"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <Form.Control as="textarea" placeholder="내용을 입력해 주세요" rows="2" />
                                                }
                                                name="content"
                                                control={control}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="핵심 카드를 입력해 주세요" />
                                                }
                                                name="key_card"
                                                control={control}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="핵심 유물을 입력해 주세요" />
                                                }
                                                name="key_relic"
                                                control={control}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="권장 카드를 입력해 주세요" />
                                                }
                                                name="recommend_card"
                                                control={control}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="권장 유물을 입력해 주세요" />
                                                }
                                                name="recommend_relic"
                                                control={control}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm={10}>
                                        <Form.Group>
                                            <Controller
                                                as={
                                                    <div className="rating">
                                                        <input id="star5" name="star" type="radio" value="5" className="radio-btn hide" />
                                                        <label htmlFor="star5">☆</label>
                                                        <input id="star4" name="star" type="radio" value="4" className="radio-btn hide" />
                                                        <label htmlFor="star4">☆</label>
                                                        <input id="star3" name="star" type="radio" value="3" className="radio-btn hide" />
                                                        <label htmlFor="star3">☆</label>
                                                        <input id="star2" name="star" type="radio" value="2" className="radio-btn hide" />
                                                        <label htmlFor="star2">☆</label>
                                                        <input id="star1" name="star" type="radio" value="1" className="radio-btn hide" />
                                                        <label htmlFor="star1">☆</label>
                                                        <div className="clear"></div>
                                                    </div>
                                                }
                                                control={control}
                                                name="score"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <input type="hidden" name="archetype" value="True" ref={register} />
                                    <Col sm={2}>
                                        <Button variant="primary" type="submit" onClick={submitMessage}>등록</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                            <hr />
                            <ListGroup as="ul">
                                <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#682B3B' }}>
                                    <span style={{ fontWeight: '600', color: '#EACCD4' }}>Archetypes</span>
                                </ListGroup.Item>
                                {currentArchetype.map((item) =>
                                    <ListGroup.Item key={item.id} variant="secondary">
                                        <span style={{ fontSize: '1rem' }}>{item.writer}</span>
                                        <span style={{ float: 'right' }}>{dateFormatter(item.created_at)}</span>
                                        <p>{item.content}</p>
                                        <p>- 핵심 카드 : {item.key_card}</p>
                                        <p>- 핵심 유물 : {item.key_relic}</p>
                                        <p>- 권장 카드 : {item.recommend_card}</p>
                                        <p>- 권장 유물 : {item.recommend_relic}</p>
                                        <div style={{ margin: '0px', textAlign: 'right', fontSize: '1rem' }}>
                                            <StarRatingComponent editing={false} starCount={5} value={item.score} />
                                        </div>
                                        <ButtonGroup style={{ float: 'right', height: '1rem' }}>
                                            <Button variant="link" style={{ position: 'relative', bottom: '5px', padding: '0 .75rem' }} onClick={reqPro.bind(this, item.id)}>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                                    <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                                </svg>
                                            </Button>
                                            <span style={{ position: 'relative', bottom: '0px' }}>{item.pro}</span>
                                            <Button variant="link" style={{ position: 'relative', bottom: '5px', padding: '0 .75rem' }} onClick={reqCon.bind(this, item.id)}>
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                                    <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                                </svg>
                                            </Button>
                                            <span style={{ position: 'relative', bottom: '0px' }}>{item.con}</span>
                                        </ButtonGroup>
                                    </ListGroup.Item>
                                )}
                                <br />
                                {paginationBasic}
                                <br />
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
        );
    }
};

export default Archetype;