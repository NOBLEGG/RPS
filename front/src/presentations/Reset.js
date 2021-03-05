import React from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Reset = ({
    postForm,
    resetConfirm,
    errorMessage,
    alerted,
    uid,
    token,
    isSuccess
}) => {
    const { handleSubmit, control, errors } = useForm();

	if (errorMessage === "VALIDATION_ERROR")
		alert("비정상적인 접근입니다, 로그인 상태를 확인해 주세요.");
	else if (errorMessage === "EMAIL_NOT_EXISTS")
		alert("등록된 이메일이 아닙니다.");
    else if (errorMessage === "CHECK_FAILED")
        alert("새 비밀번호와 비밀번호 확인 값은 동일해야 합니다. 다시 시도해 주세요.");
    else if (errorMessage === "TOO_SHORT_PASSWORD")
        alert("비밀번호가 너무 짧습니다, 8자 이상으로 입력해 주세요.");
	else if (errorMessage === "INVALID_KEY")
		alert("요청 받은 dict의 키가 유효하지 않습니다. 운영자에게 문의해 주세요.");
	else if (errorMessage === "INVALID_TYPE")
		alert("요청의 형태가 유효하지 않습니다. 운영자에게 문의해 주세요.");

    alerted();

    if (isSuccess === true) {
        alert("비밀번호 요청이 완료되었습니다, 다시 로그인 해 주세요.");
        return (
            <Redirect to="/" />
        );
    }

    const submitMessage = () => {
        if (uid !== undefined && token !== undefined)
            alert("비밀번호 변경 요청을 확인했습니다, 잠시만 기다려 주세요.");
        else
            alert("입력하신 이메일 주소로 메일을 보냅니다, 확인해 주세요.");
    }

    if (uid !== undefined && token !== undefined) {
        return (
            <div>
                <Container fluid="true" style={{ height: '105vh' }}>
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <br />
                            <Form onSubmit={handleSubmit(resetConfirm)} className="form-basis">
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <h2>비밀번호 재설정</h2>
                                </Form.Row>
                                <Form.Row>
                                    <p>비밀번호를 재설정합니다.</p>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>변경할 비밀번호</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" type="password" />
                                                }
                                                name='password'
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.password && <p className="error-message">변경할 비밀번호를 입력해 주
    세요.</p>}
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
                                                    <Form.Control placeholder="입력" type="password" />
                                                }
                                                name="check"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.check && <p className="error-message">변경할 비밀번호를 다시     입력해 주세요!</p>}
                                            <Form.Text>변경할 비밀번호를 다시 입력해 주세요.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                    <Col>
                                        <Button type="submit" onClick={submitMessage} style={{ position: "relativ    e", bottom: "25%", left: "85%" }}>변경</Button>
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
    } else {
        return (
            <div>
                <Container fluid="true" style={{ height: '100vh' }}>
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <br />
                            <Form onSubmit={handleSubmit(postForm)} className="form-basis">
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <h2>비밀번호 재설정</h2>
                                </Form.Row>
                                <Form.Row>
                                    <p>비밀번호를 재설정합니다.</p>
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
                                            <Form.Text>입력하신 이메일 주소로 메일을 보냅니다. 메일이 도착하지 않는 경우 스팸함을 확인해 보시길 바랍니다.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                    <Col>
                                        <Button type="submit" onClick={submitMessage} style={{ position: "relative", bottom: "25%", left: "85%" }}>발송</Button>
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

}

export default Reset;
