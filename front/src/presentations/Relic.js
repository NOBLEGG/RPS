import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Relic = ({
    relic,
    changeRadio,
    changeCheckbox,
    dispatcher,
    reset
}) => {
    const columns = [{
        dataField: 'name',
        text: '유물명',
        style: {textAlign: 'center'},
        formatter: (row, cell) => {
            return <Link to={{pathname: `/relic/${cell.eng_name}`}}>{cell.name}</Link>;
        }
    }, {
        dataField: 'rarity',
        text: '등급',
        style: {textAlign: 'center'}
    }, {
        dataField: 'score',
        text: '점수',
        formatter: (row, cell) => {
            if (cell.score === 0 || cell.score === '-')
                cell.score = '-';
            else
                cell.score = cell.score / cell.opinion_count;
            return cell.score;
        }
    }];

    if (relic !== undefined) {
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Row>
                                <ListGroup style={{ width: '100%' }}>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0', height: '80%' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#383018', fontWeight: '600', color: '#E5DDC3', borderTopLeftRadius: '5px'
                                        }}>캐릭터</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                            <input type="radio" name="subject" value="ironclad" onClick={changeRadio.bind(this, 'subject', 'ironclad')} />
                                            <label className="radio-label">Ironclad</label>
                                            <input type="radio" name="subject" value="silent" onClick={changeRadio.bind(this, 'subject', 'silent')} />
                                            <label className="radio-label">Silent</label>
                                            <input type="radio" name="subject" value="defect" onClick={changeRadio.bind(this, 'subject', 'defect')} />
                                            <label className="radio-label">Defect</label>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#383018', fontWeight: '600', color: '#E5DDC3'
                                        }}>등급</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                            <input type="radio" name="rarity" value="starter" onClick={changeRadio.bind(this, 'rarity', 'starter')} />
                                            <label className="radio-label">시작</label>
                                            <input type="radio" name="rarity" value="common" onClick={changeRadio.bind(this, 'rarity', 'common')} />
                                            <label className="radio-label">일반</label>
                                            <input type="radio" name="rarity" value="uncommon" onClick={changeRadio.bind(this, 'rarity', 'uncommon')} />
                                            <label className="radio-label">특별</label>
                                            <input type="radio" name="rarity" value="rare" onClick={changeRadio.bind(this, 'rarity', 'rare')} />
                                            <label className="radio-label">희귀</label>
                                            <input type="radio" name="rarity" value="boss" onClick={changeRadio.bind(this, 'rarity', 'boss')} />
                                            <label className="radio-label">보스</label>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#383018', fontWeight: '600', color: '#E5DDC3', borderBottomLeftRadius: '5px'
                                        }}>키워드</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', whiteSpace: 'nowrap',  overflowX: 'scroll', overflowY: 'hidden' }}>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'artifact')} />
                                            <label className="checkbox-label">인공물</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'block')} />
                                            <label className="checkbox-label">방어도</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'dexterity')} />
                                            <label className="checkbox-label">민첩</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'ethereal')} />
                                            <label className="checkbox-label">휘발성</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'exhaust')} />
                                            <label className="checkbox-label">소멸</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'innate')} />
                                            <label className="checkbox-label">선천성</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'intangible')} />
                                            <label className="checkbox-label">불가침</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'poison')} />
                                            <label className="checkbox-label">중독</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'retain')} />
                                            <label className="checkbox-label">보존</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'scry')} />
                                            <label className="checkbox-label">예지</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'strength')} />
                                            <label className="checkbox-label">힘</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'unplayable')} />
                                            <label className="checkbox-label">사용불가</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'vulnerable')} />
                                            <label className="checkbox-label">취약</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'weak')} />
                                            <label className="checkbox-label">약화</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'wound')} />
                                            <label className="checkbox-label">부상</label>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button style={{ marginTop: '1%', marginBottom: '1%', marginLeft: 'auto', marginRight: '1%' }} variant="secondary" size="sm" onClick={dispatcher}>검색</Button>
                                <Button style={{ marginTop: '1%', marginBottom: '1%', marginRight: 'auto', marginLeft: '1%' }} variant="secondary" size="sm" onClick={reset}>초기화</Button>
                            </Row>
                            <Row>
                                <BootstrapTable classes='table-borderless' keyField='id' data={relic} columns={columns} pagination={paginationFactory()} rowStyle={{ fontSize: '0.8rem' }} />
                            </Row>
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
        )
    }
};

export default Relic;
