import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const HomeDetail = ({
    item
}) => {
    if (item !== undefined) {
        function getHtml() {
            return <div dangerouslySetInnerHTML={{__html: item.content}} />;
        }

        return (
            <div>
                <Container fluid="true" style={{ height: '100vh' }}>
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <article>
                                <h2>{item.title}</h2>
                                <hr></hr>
                                {getHtml()}
                            </article>
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
            <div className="spin">
                <Spinner animation="border" style={{ position: 'relative', top: '40%' }}></Spinner>
            </div>
        );
    }
};

export default HomeDetail;
