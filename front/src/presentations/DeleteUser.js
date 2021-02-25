import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const DeleteUser = ({
    postForm,
    isSuccess,
    errorMessage,
    alerted
}) => {
    const { handleSubmit, control, errors } = useForm();

	if (errorMessage === "EMAIL_NOT_EXISTS")
		alert("비정상적인 접근입니다. 로그인 상태를 확인해 주세요.");
    else if (errorMessage === "PW_NOT_CORRECT")
        alert("잘못된 비밀번호를 입력하셨습니다.");

    alerted();

    if (isSuccess === true) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        alert("탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");

        document.location.href = 'https://rpspire.gg'
    }

    const submitMessage = () => {
        alert("탈퇴 요청이 전송됩니다, 잠시만 기다려 주세요.");
    }


    return (
        <div>
            <Container fluid="true" style={{ height: '105vh' }}>
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <br />
                            <Form onSubmit={handleSubmit(postForm)} className="form-basis">
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <h2>회원 탈퇴</h2>
                                </Form.Row>
                                <Form.Row>
                                    <p>등록한 회원계정을  삭제합니다. 삭제 전 다시 한번 생각해 주세요. 확인 버튼을 누르는 즉시 삭제됩니다.</p>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "2%" }}>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>비밀번호</Form.Label>
                                            <Controller
                                                as={
                                                    <Form.Control placeholder="입력" />
                                                }
                                                name="pw"
                                                control={control}
                                                rules={{ required: true }}
                                            />
                                            {errors.pw && <p className="error-message">비밀번호를 입력해 주세요.</p>}
                                            <Form.Text>비밀번호를 입력해 주세요.</Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row style={{ paddingTop: "1%", paddingBottom: "1%" }}>
                                    <Col>
                                        <Button type="submit" onClick={submitMessage} style={{ position: "relative", bottom: "25%", left: "85%" }}>확인</Button>
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

export default DeleteUser;
