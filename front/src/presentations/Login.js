import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Login = ({
    postForm,
    fbLogin
}) => {
    const { handleSubmit, control, errors } = useForm();

    const fbResponse = (response) => {
        fbLogin(response);
    }

    const googleResponse = (response) => {
        console.log(response);
    }

    return (
        <div>
            <Container fluid="true" style={{ height: '100vh' }}>
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <br />
                            <Form onSubmit={handleSubmit(postForm)} className="form-basis">
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <h2>rpspire.gg에 로그인</h2>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%" }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>이메일 주소</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="email"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.writer && <p className="error-message">이메일 주소를 입력해 주세요!</p>}
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>비밀번호</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="password"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.writer && <p className="error-message">비밀번호를 입력해 주세요!</p>}
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%" }}>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Button type="submit">로그인</Button>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Link to="/signup"><Button variant="link">회원이 아니신가요?</Button></Link>
                                    </Col>
                                </Form.Row>
                            </Form>
                            { /*
                            <div style={{ textAlign: 'center' }}>
                                <FacebookLogin
                                    appId= "675619959701878"
                                    textButton="페이스북으로 로그인"
                                    fields="name,email,picture"
                                    callback={fbResponse}
                                />
                            </div>
                            <GoogleLogin
                                clientId="project-rps-286107"
                                buttonText="LOGIN WITH GOOGLE"
                                onSuccess={googleResponse}
                                onFailure={googleResponse}
                            />
                            */ }
                        </Col>
                        <Col></Col>
                    </Row>
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

export default Login;