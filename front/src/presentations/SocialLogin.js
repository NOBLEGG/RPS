import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const SocialLogin = ({
    fbLogin
}) => {
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

export default SocialLogin;