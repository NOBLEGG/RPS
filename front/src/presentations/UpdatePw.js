import React from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UpdatePw = ({
    postForm,
    isSuccess,
    errorMessage,
    alerted
}) => {
    const { handleSubmit, control, errors } = useForm();

	if (errorMessage === "EMAIL_NOT_EXISTS")
		alert("비정상적인 접근입니다. 로그인 상태를 확인해 주세요.");
    else if (errorMessage === "CURRENT_CHECK_FAILED")
        alert("입력하신 현재 비밀번호가 등록된 비밀번호와 다릅니다. 다시 시도해 주세요.");
    else if (errorMessage === "CHECK_FAILED")
		alert("새 비밀번호와 비밀번호 확인 값은 동일해야 합니다. 다시 시도해 주세요.");
    else if (errorMessage === "TOO_SHORT_PASSWORD")
		alert("비밀번호가 너무 짧습니다, 8자 이상으로 입력해 주세요.");
    else if (errorMessage === "INVALID_KEY")
		alert("요청 받은 dict의 키가 유효하지 않습니다. 운영자에게 문의해 주세요.");
    else if (errorMessage === "INVALID_TYPE")
		alert("요청의 형태가 유효하지 않습니다. 운영자에게 문의해 주세요.");
    else if (errorMessage === "VALIDATION_ERROR")
        alert("비정상적인 접근입니다. 로그인 상태를 확인해 주세요.");

    {alerted()}

    if (isSuccess === true) {
        alert("비밀번호 요청이 완료되었습니다, 다시 로그인 해 주세요.");
        return (
            <Redirect to="/logout" />
        );
    }

    const submitMessage = () => {
        alert("비밀번호 변경 요청을 확인했습니다, 잠시만 기다려 주세요.");
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
                                    <h2>비밀번호 변경</h2>
                                </Form.Row>
                                <Form.Row>
                                    <p>비밀번호를 변경합니다.</p>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>현재 비밀번호</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="current"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.current && <p className="error-message">현재 비밀번호를 입력해 주세요.</p>}
                                            <Form.Text>현재 비밀번호를 입력해 주세요.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>변경할 비밀번호</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="password"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.password && <p className="error-message">변경할 비밀번호를  입력해 주세요!</p>}
                                            <Form.Text>변경할 비밀번호를 입력해 주세요. 비밀번호는 8자 이상이어야 합니다.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>비밀번호 확인</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="check"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.check && <p className="error-message">변경할 비밀번호를 다시 입력해 주세요!</p>}
                                            <Form.Text>변경할 비밀번호를 다시 입력해 주세요.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                    <Col>
                                        <Button type="submit" onClick={submitMessage} style={{ position: "relative", bottom: "25%", left: "85%" }}>변경</Button>
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

export default UpdatePw;
