import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getDetailAPI(character, card) {
    return axios.get('http://localhost:8000/card/' + character + '/' + card + '/');
}

function postProUpAPI(character, card, id) {
    return axios.post('http://localhost:8000/card/' + character + '/' + card + '/' + id + '/pro/');
}

function postConUpAPI(character, card, id) {
    return axios.post('http://localhost:8000/card/' + character + '/' + card + '/' + id + '/con/');
}

const GET_DETAIL         = 'cardDetail/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'cardDetail/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'cardDetail/GET_DETAIL_FAILURE';

const POST_PRO_UP         = 'cardDetail/POST_PRO_UP';
const POST_PRO_UP_SUCCESS = 'cardDetail/POST_PRO_UP_SUCCESS';
const POST_PRO_UP_FAILURE = 'cardDetail/POST_PRO_UP_FAILURE';

const POST_CON_UP         = 'cardDetail/POST_CON_UP';
const POST_CON_UP_SUCCESS = 'cardDetail/POST_CON_UP_SUCCESS';
const POST_CON_UP_FAILURE = 'cardDetail/POST_CON_UP_FAILURE';

export const getDetail = createAction(GET_DETAIL);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);

function* getDetailSaga(action) {
    try {
        const response = yield call(getDetailAPI, action.payload.character, action.payload.card);
        yield put({ type: GET_DETAIL_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_DETAIL_FAILURE, payload: e });
    }
}

function* postProUpSaga(action) {
    try {
        const response = yield call(postProUpAPI, action.payload.character, action.payload.card, action.payload.id);
        yield put({ type: POST_PRO_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_PRO_UP_FAILURE, payload: e });
    }
}

function* postConUpSaga(action) {
    try {
        const response = yield call(postConUpAPI, action.payload.character, action.payload.card, action.payload.id);
        yield put({ type: POST_CON_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_CON_UP_FAILURE, payload: e });
    }
}

const initialState = {
    card: {},
    opinion: []
};

export function* cardDetailSaga() {
    yield takeEvery('cardDetail/GET_DETAIL', getDetailSaga);
    yield takeEvery('cardDetail/POST_PRO_UP', postProUpSaga);
    yield takeEvery('cardDetail/POST_CON_UP', postConUpSaga);
}

export default handleActions(
    {
        [GET_DETAIL_SUCCESS]: (state, action) => {
            const card = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                card: card,
                opinion: opinion
            };
        },
        [POST_PRO_UP_SUCCESS]: (state, action) => {
            const card = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                card: card,
                opinion: opinion
            };
        },
        [POST_CON_UP_SUCCESS]: (state, action) => {
            const card = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                card: card,
                opinion: opinion
            };
        }
    }, initialState
);