import React from 'react';

import { Link } from 'react-router-dom';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Home = ({
    list
}) => {
    const columns = [{
        dataField: 'id',
        text: '번호',
        style: {textAlign: 'center'}
    }, {
        dataField: 'title',
        text: '제목',
        formatter: (row, cell) => {
            return <Link to={{pathname: `/notice/${cell.id}`, search: `?title=${cell.title}&content=${cell.content}`}}>{cell.title}</Link>;
        }
    }, {
        dataField: 'created_at',
        text: '등록일',
        style: {textAlign: 'center'},
        formatter: (cell) => {
            const temp = cell.substring(0, 10);
            return temp;
        }
    }, {
        dataField: 'view',
        text: '조회수'
    }];

    if (list !== undefined) {
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <BootstrapTable classes="table-borderless" keyField='id' data={list} columns={columns} pagination={paginationFactory()} />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <footer>
                                <p>footer</p>
                            </footer>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    } else {
        return (
            <div>
                <Spinner animation="border"></Spinner>
            </div>
        );
    }
};

export default Home;