import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postOpinionFormAPI(character, card, relic, data) {
    if (relic === undefined) {
        if (card === undefined) {
            // 캐릭터에 대한 의견 제출
	    return axios.post('https://rpspire.gg:8000/opinion/character/' + character + '/', data);
            // return axios.post('http://localhost:8000/opinion/character/' + character + '/', data);
        }
        else {
            // 카드에 대한 의견 제출
	    return axios.post('https://rpspire.gg:8000/opinion/card/'  + character + '/' + card + '/', data);
            // return axios.post('http://localhost:8000/opinion/card/'  + character + '/' + card + '/', data);
        }
    } else {
            // 유물에 대한 의견 제출
	    return axios.post('https://rpspire.gg:8000/opinion/relic/' + relic + '/', data);
            // return axios.post('http://localhost:8000/opinion/relic/' + relic + '/', data);
    }
}

function getOpinionListAPI(character, card, relic) {
    if (relic === undefined) {
        if (card === undefined) {
	    return axios.get('https://rpspire.gg:8000/opinion/character/' + character + '/');
	    // return axios.get('http://localhost:8000/opinion/character/' + character + '/');
	} else {
            return axios.get('https://rpspire.gg:8000/opinion/card/'  + character + '/' + card + '/');
	    // return axios.get('http://localhost:8000/opinion/card/'  + character + '/' + card + '/');
	}
    } else {
        return axios.get('https://rpspire.gg:8000/opinion/relic/' + relic + '/');
        // return axios.get('http://localhost:8000/opinion/relic/' + relic + '/');
    }
}

function getEmail() {
    const cookies = document.cookie.split(';');

    let email = '';
    let x, y;
    for (let i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf('='));
        y = cookies[i].substr(cookies[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x === 'email')
            email = y;
    }

    if (email.length === 0) {
        alert('추천, 비추천 기능은 로그인 후 이용하실 수 있습니다.');
        throw new Error();
    }

    email = email.substr(1);
    email = email.substr(0, email.length - 1);
    return email;
}

function postProUpAPI(character, card, relic, id) {
    const email = getEmail();
    return axios.post('https://rpspire.gg:8000/opinion/' + character + '/' + card + '/' + relic + '/' + id + '/' + email + '/pro/');
    // return axios.post('http://localhost:8000/opinion/' + character + '/' + card + '/' + relic + '/' + id + '/pro/');
}

function postConUpAPI(character, card, relic, id) {
    const email = getEmail();
    return axios.post('https://rpspire.gg:8000/opinion/' + character + '/' + card + '/' + relic + '/' + id + '/' + email + '/con/');
    // return axios.post('http://localhost:8000/opinion/' + character + '/' + card + '/' + relic + '/' + id + '/con/');
}

function postDeleteAPI(character, card, relic, id) {
    return axios.post('https://rpspire.gg:8000/opinion/delete/' + character + '/' + card + '/' + relic + '/' + id + '/0/');
}

const OPINION_STAR_CLICK        = 'opinion/OPINION_STAR_CLICK';

const POST_OPINION_FORM         = 'opinion/POST_OPINION_FORM';
const POST_OPINION_FORM_SUCCESS = 'opinion/POST_OPINION_FORM_SUCCESS';
const POST_OPINION_FORM_FAILURE = 'opinion/POST_OPINION_FORM_FAILURE';

const GET_OPINION_LIST          = 'opinion/GET_OPINION_LIST';
const GET_OPINION_LIST_SUCCESS  = 'opinion/GET_OPINION_LIST_SUCCESS';
const GET_OPINION_LIST_FAILURE  = 'opinion/GET_OPINION_LIST_FAILURE';

const POST_PRO_UP         = 'opinion/POST_PRO_UP';
const POST_PRO_UP_SUCCESS = 'opinion/POST_PRO_UP_SUCCESS';
const POST_PRO_UP_FAILURE = 'opinion/POST_PRO_UP_FAILURE';

const POST_CON_UP         = 'opinion/POST_CON_UP';
const POST_CON_UP_SUCCESS = 'opinion/POST_CON_UP_SUCCESS';
const POST_CON_UP_FAILURE = 'opinion/POST_CON_UP_FAILURE';

const POST_DELETE         = 'opinion/POST_DELETE';
const POST_DELETE_SUCCESS = 'opinion/POST_DELETE_SUCCESS';
const POST_DELETE_FAILURE = 'opinion/POST_DELETE_FAILURE';

const OPINION_PAGINATION_CLICK  = 'opinion/OPINION_PAGINATION_CLICK';

export const opinionStarClick = createAction(OPINION_STAR_CLICK);
export const postOpinionForm = createAction(POST_OPINION_FORM);
export const getOpinionList = createAction(GET_OPINION_LIST);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);
export const postDelete = createAction(POST_DELETE);
export const opinionPaginationClick = createAction(OPINION_PAGINATION_CLICK);

function* postOpinionFormSaga(action) {
    try {
        const response = yield call(postOpinionFormAPI, action.payload[0], action.payload[1], action.payload[2], action.payload[3]);
        yield put({ type: POST_OPINION_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_OPINION_FORM_FAILURE, payload: e });
    }
}

function* getOpinionListSaga(action) {
    try {
        const response = yield call(getOpinionListAPI, action.payload[0], action.payload[1], action.payload[2]);
        yield put({ type: GET_OPINION_LIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_OPINION_LIST_FAILURE, payload: e });
    }
}

function* postProUpSaga(action) {
    try {
        const response = yield call(postProUpAPI, action.payload[0], action.payload[1], action.payload[2], action.payload[3]);
        yield put({ type: POST_PRO_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_PRO_UP_FAILURE, payload: e });
    }
}

function* postConUpSaga(action) {
    try {
        const response = yield call(postConUpAPI, action.payload[0], action.payload[1], action.payload[2], action.payload[3]);
        yield put({ type: POST_CON_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_CON_UP_FAILURE, payload: e });
    }
}

function* postDeleteSaga(action) {
    try {
        const response = yield call(postDeleteAPI, action.payload[0], action.payload[1], action.payload[2], action.payload[3]);
        yield put({ type: POST_DELETE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_DELETE_FAILURE, payload: e });
    }
}

const initialState = {
    rating: 0,
    opinion: [],
    perPage: 10,
    currentPage: 1
}

export function* opinionSaga() {
    yield takeEvery('opinion/POST_OPINION_FORM', postOpinionFormSaga);
    yield takeEvery('opinion/GET_OPINION_LIST', getOpinionListSaga);
    yield takeEvery('opinion/POST_PRO_UP', postProUpSaga);
    yield takeEvery('opinion/POST_CON_UP', postConUpSaga);
    yield takeEvery('opinion/POST_DELETE', postDeleteSaga);
}

export default handleActions(
    {
        [OPINION_STAR_CLICK]: (state, action) => {
            return {
                rating: action.payload,
                opinion: state.opinion,
                perPage: state.perPage,
                currentPage: state.currentPage
            }
        },
        [POST_OPINION_FORM_SUCCESS]: (state, action) => {
            return {
                rating: state.rating,
                opinion: action.payload.data,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [GET_OPINION_LIST_SUCCESS]: (state, action) => {
            return {
                rating: state.rating,
                opinion: action.payload.data,
                perPage: 10,
                currentPage: 1
            };
        },
        [POST_PRO_UP_SUCCESS]: (state, action) => {
            return {
                rating: state.rating,
                opinion: action.payload.data,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_PRO_UP_FAILURE]: (state, action) => {
            if (action.payload.response.status === 403)
                alert('이미 추천하셨습니다.');
            return {
                rating: state.rating,
                opinion: state.opinion,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_CON_UP_SUCCESS]: (state, action) => {
            return {
                rating: state.rating,
                opinion: action.payload.data,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_CON_UP_FAILURE]: (state, action) => {
            if (action.payload.response.status === 403)
                alert('이미 비추천하셨습니다.');
            return {
                rating: state.rating,
                opinion: state.opinion,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_DELETE_SUCCESS]: (state, action) => {
            alert('삭제되었습니다.');
            return {
                rating: state.rating,
                opinion: action.payload.data,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_DELETE_FAILURE]: (state, action) => {
            alert('삭제 요청이 거절되었습니다.');
            console.log(action);
            return {
                rating: state.rating,
                opinion: state.opinion,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [OPINION_PAGINATION_CLICK]: (state, action) => {
            const num = action.payload;
            return {
                rating: state.rating,
                opinion: state.opinion,
                perPage: state.perPage,
                currentPage: num
            }
        }
    }, initialState
);
