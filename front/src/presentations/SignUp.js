import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const SignUp = ({
    postForm,
    errorMessage
}) => {
    const { handleSubmit, control, errors } = useForm();

	if (errorMessage === "VALIDATION_ERROR")
		alert("적절한 이메일 주소가 아닙니다, 확인해 주세요.");
	else if (errorMessage === "EMAIL_EXISTS")
		alert("이미 등록된 이메일입니다. 다른 이메일으로 시도해 주세요.");
	else if (errorMessage === "USERNAME_EXISTS")
		alert("사용중인 이름입니다. 다른 이름으로 시도해 주세요.");
	else if (errorMessage === "TOO_SHORT_PASSWORD")
		alert("비밀번호가 너무 짧습니다, 8자 이상으로 입력해 주세요.");
	else if (errorMessage === "INVALID_KEY")
		alert("요청 받은 dict의 키가 유효하지 않습니다. 운영자에게 문의해 주세요.");
	else if (errorMessage === "INVALID_TYPE")
		alert("요청의 형태가 유효하지 않습니다. 운영자에게 문의해 주세요.");

    const submitMessage = () => {
        alert("해당 이메일로 인증 메일을 보냅니다, 확인해 주세요.");
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
                                    <h2>rpspire.gg에 가입</h2>
                                </Form.Row>
                                <Form.Row>
                                    <p>rpspire.gg 가입을 환영합니다.</p>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "2%" }}>
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
                                            {errors.email && <p className="error-message">이메일 주소를 입력해 주세요.</p>}
                                            <Form.Text>입력하신 이메일 주소로 인증 메일을 보냅니다. 메일이 도착하지 않는 경우 스팸함을 확인해 보시길 바랍니다.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>사용자 이름</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="username"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.username && <p className="error-message">사용자 이름을 입력해 주세요!</p>}
                                            <Form.Text>사이트 내 활동 시 표시될 자신의 이름입니다.</Form.Text>
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
                                            {errors.password && <p className="error-message">비밀번호를 입력해 주세요!</p>}
                                            <Form.Text>비밀번호는 8자 이상으로 입력해 주세요. 이메일 계정에 사용하고 있는 비밀번호와 다른 비밀번호를 사용하는 것이 보안에 유리합니다.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                    <Col>
                                        <Button type="submit" onClick={submitMessage} style={{ position: "relative", bottom: "25%", left: "85%" }}>가입</Button>
                                    </Col>
                                </Form.Row>
                            </Form>
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

export default SignUp;
