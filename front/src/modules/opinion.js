import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postOpinionFormAPI(subject, data) {
    return axios.post('http://localhost:8000/opinion/' + subject + '/', data);
}

function getOpinionListAPI(subject) {
    return axios.get('http://localhost:8000/opinion/' + subject + '/');
}

function postProUpAPI(subject, id) {
    return axios.post('http://localhost:8000/character/' + subject + '/' + id + '/pro/');
}

function postConUpAPI(subject, id) {
    return axios.post('http://localhost:8000/character/' + subject + '/' + id + '/con/');
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

const OPINION_PAGINATION_CLICK  = 'opinion/OPINION_PAGINATION_CLICK';

export const opinionStarClick = createAction(OPINION_STAR_CLICK);
export const postOpinionForm = createAction(POST_OPINION_FORM);
export const getOpinionList = createAction(GET_OPINION_LIST);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);
export const opinionPaginationClick = createAction(OPINION_PAGINATION_CLICK);

function* postOpinionFormSaga(action) {
    try {
        const response = yield call(postOpinionFormAPI, action.payload[1], action.payload[0]);
        yield put({ type: POST_OPINION_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_OPINION_FORM_FAILURE, payload: e });
    }
}

function* getOpinionListSaga(action) {
    try {
        const response = yield call(getOpinionListAPI, action.payload);
        yield put({ type: GET_OPINION_LIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_OPINION_LIST_FAILURE, payload: e });
    }
}

function* postProUpSaga(action) {
    try {
        const response = yield call(postProUpAPI, action.payload.subject, action.payload.id);
        yield put({ type: POST_PRO_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_PRO_UP_FAILURE, payload: e });
    }
}

function* postConUpSaga(action) {
    try {
        const response = yield call(postConUpAPI, action.payload.subject, action.payload.id);
        yield put({ type: POST_CON_UP_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_CON_UP_FAILURE, payload: e });
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
}

export default handleActions(
    {
        [OPINION_STAR_CLICK]: (state, action) => {
            const nextValue = action.payload;
            return {
                rating: nextValue,
                opinion: state.opinion,
                perPage: state.perPage,
                currentPage: state.currentPage
            }
        },
        [POST_OPINION_FORM_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                opinion: res,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [GET_OPINION_LIST_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                opinion: res,
                perPage: 10,
                currentPage: 1
            };
        },
        [POST_PRO_UP_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                opinion: res[0],
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_CON_UP_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                opinion: res[0],
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