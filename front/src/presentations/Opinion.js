import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Pagination, Container, Row, Col, Form, Button, ButtonGroup, ListGroup, Spinner } from 'react-bootstrap';

import StarRatingComponent from 'react-star-rating-component';

const Opinion = ({
    subject,
    rating,
    opinionStarClick,
    opinion,
    postForm,
    reqPro,
    reqCon,
    perPage,
    currentPage,
    handleClick
}) => {
    const { handleSubmit, control, errors } = useForm();

    let bgColor = "";
    let textColor = "";

    if (subject === "ironclad") {
        bgColor = "#682B3B";
        textColor = "#EACCD4";
    } else if (subject === "silent") {
        bgColor = "#606C54";
        textColor = "#DFE3DB";
    } else if (subject === "defect") {
        bgColor = "#586983";
        textColor = "#DCE1E8";
    }

    const submitMessage = () => {
        alert("등록 요청을 확인했습니다. 양식에 맞게 제출했을 경우 내용이 화면에 반영되기까지 시간이 걸릴 수 있습니다.");
    }

    function dateFormatter(str) {
        return str.substring(0, 10);
    }

    if (opinion !== undefined) {
        const indexOfLastOpinion = currentPage * perPage;
        const indexOfFirstOpinion = indexOfLastOpinion - perPage;
        const currentOpinion = opinion.slice(indexOfFirstOpinion, indexOfLastOpinion);

        let items = [];
        for (let number = 1; number <= Math.ceil(opinion.length / perPage); number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={handleClick.bind(this, number)}>
                    {number}
                </Pagination.Item>
            );
        }

        const paginationBasic = (
            <Pagination size="sm">{items}</Pagination>
        );

        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Form onSubmit={handleSubmit(postForm)} className="form-basis">
                                <Form.Row style={{ paddingTop: '10px' }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>작성자</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="writer"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.writer && <p className="error-message">작성자명을 입력해 주세요!</p>}
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>설명</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control as="textarea" placeholder="입력" rows="2" />
                                                }
                                                name="content"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.content && <p className="error-message">내용을 입력해 주세요!</p>}
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ marginBottom: '10px' }}>
                                    <Col sm={10}>
                                        <Form.Group>
                                            <Form.Label style={{ display: 'block' }}>점수</Form.Label>
                                            <Controller
                                                as={
                                                    <StarRatingComponent starCount={5} value={rating} onStarClick={opinionStarClick.bind(this)} emptyStarColor={'#6D7F91'} style={{ fontSize: '1.8rem' }} />
                                                }
                                                control={control}
                                                name="score"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={2}>
                                        <Button variant="primary" type="submit" onClick={submitMessage} style={{ position: 'absolute', right: '10%', bottom: '15%' }}>등록</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
                            <hr />
                            <ListGroup as="ul">
                                <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: bgColor }}>
                                    <span style={{ fontWeight: '600', color: textColor }}>Opinions</span>
                                </ListGroup.Item>
                                {currentOpinion.map((item) =>
                                    <ListGroup.Item key={item.id} variant="secondary">
                                        <span style={{ fontSize: '1rem' }}>{item.writer}</span>
                                        <span style={{ float: 'right' }}>{dateFormatter(item.created_at)}</span>
                                        <p>{item.content}</p>
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
            <div className="spin">
                <Spinner animation="border" style={{ position: 'relative', top: '40%' }}></Spinner>
            </div>
        );
    }
};

export default Opinion;