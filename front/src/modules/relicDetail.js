import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getDetailAPI(relic) {
    return axios.get('http://rpspire.gg:8000/relic/' + relic + '/');
    // return axios.get('http://localhost:8000/relic/' + relic + '/');
}

function postProUpAPI(relic, id) {
    return axios.post('http://rpspire.gg:8000/relic/' + relic + '/' + id + '/pro/');
    // return axios.post('http://localhost:8000/relic/' + relic + '/' + id + '/pro/');
}

function postConUpAPI(relic, id) {
    return axios.post('http://rpspire.gg:8000/relic/' + relic + '/' + id + '/con/');
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
        [POST_CON_UP_SUCCESS]: (state, action) => {
            const relic = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                relic: relic,
                opinion: opinion
            };
        }
    }, initialState
);
