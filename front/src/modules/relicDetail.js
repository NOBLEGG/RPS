import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getDetailAPI(relic) {
    return axios.get('https://rpspire.gg:8000/relic/' + relic + '/');
    // return axios.get('http://localhost:8000/relic/' + relic + '/');
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

function postProUpAPI(relic, id) {
    const email = getEmail();
    return axios.post('https://rpspire.gg:8000/relic/' + relic + '/' + id + '/' + email + '/pro/');
    // return axios.post('http://localhost:8000/relic/' + relic + '/' + id + '/pro/');
}

function postConUpAPI(relic, id) {
    const email = getEmail();
    return axios.post('https://rpspire.gg:8000/relic/' + relic + '/' + id + '/' + email + '/con/');
    // return axios.post('http://localhost:8000/relic/' + relic + '/' + id + '/con/');
}

const GET_DETAIL         = 'relicDetail/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'relicDetail/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'relicDetail/GET_DETAIL_FAILURE';

const POST_PRO_UP         = 'relicDetail/POST_PRO_UP';
const POST_PRO_UP_SUCCESS = 'relicDetail/POST_PRO_UP_SUCCESS';
const POST_PRO_UP_FAILURE = 'relicDetail/POST_PRO_UP_FAILURE';

const POST_CON_UP         = 'relicDetail/POST_CON_UP';
const POST_CON_UP_SUCCESS = 'relicDetail/POST_CON_UP_SUCCESS';
const POST_CON_UP_FAILURE = 'relicDetail/POST_CON_UP_FAILURE';

export const getDetail = createAction(GET_DETAIL);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);

function* getDetailSaga(action) {
    try {
        const response = yield call(getDetailAPI, action.payload);
        yield put({ type: GET_DETAIL_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_DETAIL_FAILURE, payload: e });
    }
}

function* postProUpSaga(action) {
    try {
        const response = yield call(postProUpAPI, action.payload.relic, action.payload.id);
        yield put({ type: POST_PRO_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_PRO_UP_FAILURE, payload: e });
    }
}

function* postConUpSaga(action) {
    try {
        const response = yield call(postConUpAPI, action.payload.relic, action.payload.id);
        yield put({ type: POST_CON_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_CON_UP_FAILURE, payload: e });
    }
}

const initialState = {
    relic: {},
    opinion: []
};

export function* relicDetailSaga() {
    yield takeEvery('relicDetail/GET_DETAIL', getDetailSaga);
    yield takeEvery('relicDetail/POST_PRO_UP', postProUpSaga);
    yield takeEvery('relicDetail/POST_CON_UP', postConUpSaga);
}

export default handleActions(
    {
        [GET_DETAIL_SUCCESS]: (state, action) => {
            const relic = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                relic: relic,
                opinion: opinion
            };
        },
        [POST_PRO_UP_SUCCESS]: (state, action) => {
            const relic = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                relic: relic,
                opinion: opinion
            };
        },
        [POST_PRO_UP_FAILURE]: (state, action) => {
            const resCode = action.payload.response.status;
            if (resCode === 403)
                alert('이미 추천하셨습니다.');
            return {
                relic: state.relic,
                opinion: state.opinion
            };
        },
        [POST_CON_UP_SUCCESS]: (state, action) => {
            const relic = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                relic: relic,
                opinion: opinion
            };
        },
        [POST_CON_UP_FAILURE]: (state, action) => {
            const resCode = action.payload.response.status;
            if (resCode === 403)
                alert('이미 비추천하셨습니다.');
            return {
                relic: state.relic,
                opinion: state.opinion
            };
        },
    }, initialState
);
