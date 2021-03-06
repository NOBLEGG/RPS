import React from 'react';

import { Link } from 'react-router-dom';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Home = ({
    list,
    isStaff
}) => {
    const columns = [{
        dataField: 'id',
        text: '번호',
        headerStyle: {width: '15%'},
        style: {textAlign: 'center'}
    }, {
        dataField: 'title',
        text: '제목',
        style: {overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textAlign: 'left'},
        formatter: (row, cell) => {
            return <Link to={{pathname: `/notice/detail/${cell.id}`}}>{cell.title}</Link>;
        }
    }, {
        dataField: 'created_at',
        text: '등록일',
        headerStyle: {width: '25%'},
        style: {textAlign: 'center'},
        formatter: (cell) => {
            const temp = cell.substring(0, 10);
            return temp;
        }
    }, {
        dataField: 'view',
        text: '조회수',
        headerStyle: {width: '20%'}
    }];

    if (list !== undefined) {
        const pagination = paginationFactory({
            sizePerPage: 25
        });

        return (
            <div>
                <Container fluid='true'>
                    <Row>
                        <Col id='left-layout'></Col>
                        <Col id='main-layout' xs={12} xl={8} sm={8} md={8} lg={8}>
                            <BootstrapTable classes='table-borderless' keyField='id' data={list} columns={columns} pagination={pagination} />
                        </Col>
                        <Col id='right-layout'></Col>
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

export default Home;
