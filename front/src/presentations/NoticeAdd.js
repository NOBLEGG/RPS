import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const NoticeAdd = ({
    postForm
}) => {
    const { handleSubmit, control, errors } = useForm();

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
                                        <Form.Label>제목</Form.Label>
                                        <Controller
                                            as={
                                                <Form.Control as="textarea" placeholder="입력" rows="2" />
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
                                        <Form.Label>내용</Form.Label>
                                        <Controller
                                            as={
                                                <Form.Control as="textarea" placeholder="입력" rows="10" />
                                            }
                                            name="content"
                                            control={control}
                                            rules={{ required: true }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button type="submit">GO</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
};

export default NoticeAdd;

