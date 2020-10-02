import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button, ButtonGroup, OverlayTrigger, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import StarRatingComponent from 'react-star-rating-component';

const Ironclad = ({
    opinion,
    reqPro,
    reqCon,
    card,
    archetype,
    changeRadio,
    changeCheckbox,
    dispatcher,
    reset
}) => {
    function dateFormatter(str) {
        return str.substring(0, 10);
    }

    const columns = [{
        dataField: 'name',
        text: '카드명',
        style: {textAlign: 'center'},
        formatter: (row, cell) => {
            const imgSrc = "../ironclad/";
            let temp = cell.eng_name.toLowerCase();
            temp = imgSrc + temp + ".jpg";
            return <OverlayTrigger overlay={<Image src={temp} />}><Link to={{pathname: `/card/${cell.subject}/${cell.eng_name}`}}>{cell.name}</Link></OverlayTrigger>;
        }
    }, {
        dataField: 'rarity',
        text: '등급',
        style: {textAlign: 'center'}
    }, {
        dataField: 'kind',
        text: '종류',
        style: {textAlign: 'center'}
    }, {
        dataField: 'cost',
        text: '비용'
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

    function opinionRow() {
        if (opinion.length !== 0) {
            return (
                <Row>
                    <Col>
                        <ListGroup as="ul">
                            <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#682B3B' }}>
                                <span style={{ fontWeight: '600', color: '#EACCD4' }}>Opinions</span>
                                <Link to="/opinion/character/ironclad"><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                            </ListGroup.Item>
                            {opinion.map((opinion) =>
                                <ListGroup.Item key={opinion.id} variant="secondary">
                                    <span style={{ fontSize: '1rem' }}>{opinion.writer}</span>
                                    <span style={{ float: 'right' }}>{dateFormatter(opinion.created_at)}</span>
                                    <p>{opinion.content}</p>
                                    <div style={{ margin: '0px', textAlign: 'right', fontSize: '1rem' }}>
                                        <StarRatingComponent editing={false} starCount={5} value={opinion.score} />
                                    </div>
                                    <ButtonGroup style={{ float: 'right', height: '1rem' }}>
                                        <Button variant="link" style={{ position: 'relative', bottom: '-2.5px', padding: '0 0.1rem' }} onClick={reqPro.bind(this, opinion.id)}>
                                            <svg width="1em" height="1em" style={{ position: "relative", bottom: "0.5rem" }} viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                                <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                        </Button>
                                        <span style={{ position: 'relative', bottom: '0px', padding: '0 0.5rem' }}>{opinion.pro}</span>
                                        <Button variant="link" style={{ position: 'relative', bottom: '-2.5px', padding: '0 0.1rem' }} onClick={reqCon.bind(this, opinion.id)}>
                                            <svg width="1em" height="1em" style={{ position: "relative", bottom: "0.5rem" }} viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                                <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </Button>
                                        <span style={{ position: 'relative', bottom: '0px', padding: '0 0.5rem' }}>{opinion.con}</span>
                                    </ButtonGroup>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col>
                        <ListGroup as="ul">
                            <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#682B3B' }}>
                                <span style={{ fontWeight: '600', color: '#EACCD4' }}>Opinions</span>
                                <Link to="/opinion/character/ironclad"><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                            </ListGroup.Item>
                            <ListGroup.Item variant="secondary" style={{ height: '20rem', textAlign: 'center' }}>
                                <p style={{ padding: '1em', fontSize: '1rem' }}>바로 윗 줄에 있는 + 버튼을 눌러 첫 의견을 등록해 주세요!</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )
        }
    }

    function archetypeRow() {
        if (archetype.length !== 0) {
            <Row>
                <Col>
                    <ListGroup as="ul">
                        <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#682B3B' }}>
                            <span style={{ fontWeight: '600', color: '#EACCD4' }}>Archetypes</span>
                            <Link to="/archetype/ironclad"><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                        </ListGroup.Item>
                        {archetype.map((archetype) =>
                            <ListGroup.Item key={archetype.id} variant="secondary">
                                <span style={{ fontSize: '1rem' }}>{archetype.writer}</span>
                                <span style={{ float: 'right' }}>{dateFormatter(archetype.created_at)}</span>
                                <p>{archetype.content}</p>
                                <p>- 핵심 카드 : {archetype.key_card}</p>
                                <p>- 핵심 유물 : {archetype.key_relic}</p>
                                <p>- 권장 카드 : {archetype.recommend_card}</p>
                                <p>- 권장 유물 : {archetype.recommend_relic}</p>
                                <div style={{ margin: '0px', textAlign: 'right', fontSize: '1rem' }}>
                                    <StarRatingComponent editing={false} starCount={5} value={archetype.score} />
                                </div>
                                <ButtonGroup style={{ float: 'right', height: '1rem' }}>
                                    <Button variant="link" style={{ position: 'relative', bottom: '-2.5px', padding: '0 0.1rem' }} onClick={reqPro.bind(this, archetype.id)}>
                                        <svg width="1em" height="1em" style={{ position: "relative", bottom: "0.5rem" }} viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                            <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                        </svg>
                                    </Button>
                                    <span style={{ position: 'relative', bottom: '0px', padding: '0 0.5rem' }}>{archetype.pro}</span>
                                    <Button variant="link" style={{ position: 'relative', bottom: '-2.5px', padding: '0 0.1rem' }} onClick={reqCon.bind(this, archetype.id)}>
                                        <svg width="1em" height="1em" style={{ position: "relative", bottom: "0.5rem" }} viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                            <path fillRule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                    </Button>
                                    <span style={{ position: 'relative', bottom: '0px', padding: '0 0.5rem' }}>{archetype.con}</span>
                                </ButtonGroup>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        } else {
            return (
                <Row>
                    <Col>
                        <ListGroup as="ul">
                            <ListGroup.Item style={{ height: '3em', padding: '.5rem 1.25rem', backgroundColor: '#682B3B' }}>
                                <span style={{ fontWeight: '600', color: '#EACCD4' }}>Archetypes</span>
                                <Link to="/archetype/ironclad"><Button variant="link" style={{ position: 'absolute', top: '0px', right: '0px', padding: '.225rem .75rem .375rem .75rem' }}>+</Button></Link>
                            </ListGroup.Item>
                            <ListGroup.Item variant="secondary" style={{ height: '20rem', textAlign: 'center' }}>
                                <p style={{ padding: '1em', fontSize: '1rem' }}>바로 윗 줄에 있는 + 버튼을 눌러 첫 archetype을 등록해 주세요!</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )
        }
    }

    if (card.length !== 0) {
        return (
            <div>
                <Container fluid="true">
                    <Row>
                        <Col></Col>
                        <Col id="main-layout" xs={8} xl={8} sm={8} md={8} lg={8}>
                            <Row>
                                <Image id="character-img" src="../ironclad/ironclad.jpg" />
                            </Row>
                            <br />
                            {opinionRow()}
                            <br />
                            <Row>
                                <ListGroup style={{ width: '100%' }}>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0', height: '80%' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#682B3B', fontWeight: '600', color: '#EACCD4', borderTopLeftRadius: '5px'
                                        }}>등급</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                            <input type="radio" name="rarity" value="common" onClick={changeRadio.bind(this, 'rarity', 'common')} />
                                            <label className="radio-label">일반</label>
                                            <input type="radio" name="rarity" value="uncommon" onClick={changeRadio.bind(this, 'rarity', 'uncommon')} />
                                            <label className="radio-label">특별</label>
                                            <input type="radio" name="rarity" value="rare" onClick={changeRadio.bind(this, 'rarity', 'rare')} />
                                            <label className="radio-label">희귀</label>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#682B3B', fontWeight: '600', color: '#EACCD4'
                                        }}>종류</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                            <input type="radio" name="kind" value="attack" onClick={changeRadio.bind(this, 'kind', 'attack')} />
                                            <label className="radio-label">공격</label>
                                            <input type="radio" name="kind" value="skill" onClick={changeRadio.bind(this, 'kind', 'skill')} />
                                            <label className="radio-label">스킬</label>
                                            <input type="radio" name="kind" value="power" onClick={changeRadio.bind(this, 'kind', 'power')} />
                                            <label className="radio-label">파워</label>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#682B3B', fontWeight: '600', color: '#EACCD4'
                                        }}>비용</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                            <input type="radio" name="cost" value="X" onClick={changeRadio.bind(this, 'cost', 'X')} />
                                            <label className="radio-label">X</label>
                                            <input type="radio" name="cost" value="0" onClick={changeRadio.bind(this, 'cost', '0')} />
                                            <label className="radio-label">0</label>
                                            <input type="radio" name="cost" value="1" onClick={changeRadio.bind(this, 'cost', '1')} />
                                            <label className="radio-label">1</label>
                                            <input type="radio" name="cost" value="2" onClick={changeRadio.bind(this, 'cost', '2')} />
                                            <label className="radio-label">2</label>
                                            <input type="radio" name="cost" value="3" onClick={changeRadio.bind(this, 'cost', '3')} />
                                            <label className="radio-label">3</label>
                                            <input type="radio" name="cost" value="4" onClick={changeRadio.bind(this, 'cost', '4')} />
                                            <label className="radio-label">4</label>
                                            <input type="radio" name="cost" value="5" onClick={changeRadio.bind(this, 'cost', '5')} />
                                            <label className="radio-label">5</label>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="div" variant="secondary" style={{ padding: '0' }}>
                                        <div className="categorize" style={{
                                            backgroundColor: '#682B3B', fontWeight: '600', color: '#EACCD4', borderBottomLeftRadius: '5px'
                                        }}>키워드</div>
                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', whiteSpace: 'nowrap',  overflowX: 'scroll', overflowY: 'hidden' }}>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'block')} />
                                            <label className="checkbox-label">방어도</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'ethereal')} />
                                            <label className="checkbox-label">휘발성</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'exhaust')} />
                                            <label className="checkbox-label">소멸</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'innate')} />
                                            <label className="checkbox-label">선천성</label>
                                            <input type="checkbox" onClick={changeCheckbox.bind(this, 'strength')} />
                                            <label className="checkbox-label">힘</label>
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
                                <BootstrapTable classes='table-borderless' keyField='eng_name' data={card} columns={columns} pagination={paginationFactory()} rowStyle={{ fontSize: '0.8rem' }} />
                            </Row>
                            <br />
                            {archetypeRow()}
                        </Col>
                        <Col></Col>
                    </Row>
                    <br />
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

export default Ironclad;
