import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postArchetypeFormAPI(subject, data) {
    return axios.post('http://rpspire.gg:8000/archetype' + subject + '/', data);
    // return axios.post('http://localhost:8000/archetype/' + subject + '/', data);
}

function getArchetypeListAPI(subject) {
    return axios.get('http://rpspire.gg:8000/archetype/' + subject + '/');
    // return axios.get('http://localhost:8000/archetype/' + subject + '/');
}

function postProUpAPI(subject, id) {
    return axios.post('http://rpspire.gg:8000/character/' + subject + '/' + id + '/pro/');
    // return axios.post('http://localhost:8000/character/' + subject + '/' + id + '/pro/');
}

function postConUpAPI(subject, id) {
    return axios.post('http://rpspire.gg:8000/character/' + subject + '/' + id + '/con/');
    // return axios.post('http://localhost:8000/character/' + subject + '/' + id + '/con/');
}

const ARCHETYPE_STAR_CLICK        = 'archetype/ARCHETYPE_STAR_CLICK';

const POST_ARCHETYPE_FORM         = 'archetype/POST_ARCHETYPE_FORM';
const POST_ARCHETYPE_FORM_SUCCESS = 'archetype/POST_ARCHETYPE_FORM_SUCCESS';
const POST_ARCHETYPE_FORM_FAILURE = 'archetype/POST_ARCHETYPE_FORM_FAILURE';

const GET_ARCHETYPE_LIST          = 'archetype/GET_ARCHETYPE_LIST';
const GET_ARCHETYPE_LIST_SUCCESS  = 'archetype/GET_ARCHETYPE_LIST_SUCCESS';
const GET_ARCHETYPE_LIST_FAILURE  = 'archetype/GET_ARCHETYPE_LIST_FAILURE';

const POST_PRO_UP         = 'archetype/POST_PRO_UP';
const POST_PRO_UP_SUCCESS = 'archetype/POST_PRO_UP_SUCCESS';
const POST_PRO_UP_FAILURE = 'archetype/POST_PRO_UP_FAILURE';

const POST_CON_UP         = 'archetype/POST_CON_UP';
const POST_CON_UP_SUCCESS = 'archetype/POST_CON_UP_SUCCESS';
const POST_CON_UP_FAILURE = 'archetype/POST_CON_UP_FAILURE';

const ARCHETYPE_PAGINATION_CLICK  = 'archetype/ARCHETYPE_PAGINATION_CLICK';

export const archetypeStarClick = createAction(ARCHETYPE_STAR_CLICK);
export const postArchetypeForm = createAction(POST_ARCHETYPE_FORM);
export const getArchetypeList = createAction(GET_ARCHETYPE_LIST);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);
export const archetypePaginationClick = createAction(ARCHETYPE_PAGINATION_CLICK);

function* postArchetypeFormSaga(action) {
    try {
        const response = yield call(postArchetypeFormAPI, action.payload[1], action.payload[0]);
        yield put({ type: POST_ARCHETYPE_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_ARCHETYPE_FORM_FAILURE, payload: e });
    }
}

function* getArchetypeListSaga(action) {
    try {
        const response = yield call(getArchetypeListAPI, action.payload);
        yield put({ type: GET_ARCHETYPE_LIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_ARCHETYPE_LIST_FAILURE, payload: e });
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
    archetype: [],
    perPage: 10,
    currentPage: 1
};

export function* archetypeSaga() {
    yield takeEvery('archetype/POST_ARCHETYPE_FORM', postArchetypeFormSaga);
    yield takeEvery('archetype/GET_ARCHETYPE_LIST', getArchetypeListSaga);
    yield takeEvery('archetype/POST_PRO_UP', postProUpSaga);
    yield takeEvery('archetype/POST_CON_UP', postConUpSaga);
}

export default handleActions(
    {
        [ARCHETYPE_STAR_CLICK]: (state, action) => {
            const nextValue = action.payload;
            return {
                rating: nextValue,
                archetype: state.archetype,
                perPage: state.perPage,
                currentPage: state.currentPage
            }
        },
        [POST_ARCHETYPE_FORM_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                archetype: res,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_PRO_UP_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                archetype: res[2],
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_CON_UP_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                archetype: res[2],
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [GET_ARCHETYPE_LIST_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                rating: state.rating,
                archetype: res,
                perPage: 10,
                currentPage: 1
            };
        },
        [ARCHETYPE_PAGINATION_CLICK]: (state, action) => {
            const num = action.payload;
            return {
                rating: state.rating,
                archetype: state.archetype,
                perPage: state.perPage,
                currentPage: num
            }
        }
    }, initialState
);
