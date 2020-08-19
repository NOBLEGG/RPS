import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HomeDetail = ({
    item,
    query
}) => {
    return (
        <div>
            <Container fluid="true" style={{ height: '100vh' }}>
                <Row>
                    <Col></Col>
                    <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                        <article>
                            <h2>{query.title ? query.title : item.title}</h2>
                            <hr></hr>
                            <p>{query.title ? query.content : item.content}</p>
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
};

export default HomeDetail;