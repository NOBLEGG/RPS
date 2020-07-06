import React from 'react';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { useForm, Controller } from 'react-hook-form';

const Archetype = ({
    data,
    postForm
}) => {
    const { handleSubmit, control, register } = useForm();

    const columns = [{
        dataField: 'writer',
        text: '작성자',
        style: {textAlign: 'center'}
    }, {
        dataField: 'content',
        text: '내용'
    }, {
        dataField: 'created_at',
        text: '등록일',
        style: {textAlign: 'center'}
    }];

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
                                                <Form.Control placeholder="제목" />
                                            }
                                            name="title"
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
                                    <Button variant="primary" type="submit">
                                        등록
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                        <hr />
                        <BootstrapTable keyField='id' data={data} columns={columns} pagination={paginationFactory()} />
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

export default Archetype;