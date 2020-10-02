import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postArchetypeFormAPI(subject, data) {
    return axios.post('https://rpspire.gg:8000/archetype/' + subject + '/', data);
    // return axios.post('http://localhost:8000/archetype/' + subject + '/', data);
}

function getArchetypeListAPI(subject) {
    return axios.get('https://rpspire.gg:8000/archetype/' + subject + '/');
    // return axios.get('http://localhost:8000/archetype/' + subject + '/');
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

function postProUpAPI(subject, id) {
    const email = getEmail();
    return axios.post('https://rpspire.gg:8000/character/' + subject + '/' + id + '/' + email + '/pro/');
    // return axios.post('http://localhost:8000/character/' + subject + '/' + id + '/pro/');
}

function postConUpAPI(subject, id) {
    const email = getEmail();
    return axios.post('https://rpspire.gg:8000/character/' + subject + '/' + id + '/' + email + '/con/');
    // return axios.post('http://localhost:8000/character/' + subject + '/' + id + '/con/');
}

function postDeleteAPI(character, id) {
    const card = undefined;
    const relic = undefined;
    return axios.post('https://rpspire.gg:8000/opinion/delete/' + character + '/' + card + '/' + relic + '/' + id + '/1/');
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

const POST_DELETE         = 'archetype/POST_DELETE';
const POST_DELETE_SUCCESS = 'archetype/POST_DELETE_SUCCESS';
const POST_DELETE_FAILURE = 'archetype/POST_DELETE_FAILURE';

const ARCHETYPE_PAGINATION_CLICK  = 'archetype/ARCHETYPE_PAGINATION_CLICK';

export const archetypeStarClick = createAction(ARCHETYPE_STAR_CLICK);
export const postArchetypeForm = createAction(POST_ARCHETYPE_FORM);
export const getArchetypeList = createAction(GET_ARCHETYPE_LIST);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);
export const postDelete = createAction(POST_DELETE);
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

function* postDeleteSaga(action) {
    try {
        const response = yield call(postDeleteAPI, action.payload.subject, action.payload.id);
        yield put({ type: POST_DELETE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_DELETE_FAILURE, payload: e });
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
    yield takeEvery('archetype/POST_DELETE', postDeleteSaga);
}

export default handleActions(
    {
        [ARCHETYPE_STAR_CLICK]: (state, action) => {
            return {
                rating: action.payload,
                archetype: state.archetype,
                perPage: state.perPage,
                currentPage: state.currentPage
            }
        },
        [POST_ARCHETYPE_FORM_SUCCESS]: (state, action) => {
            return {
                rating: state.rating,
                archetype: action.payload.data,
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
        [POST_PRO_UP_FAILURE]: (state, action) => {
            if (action.payload.response.status === 403)
                alert('이미 추천하셨습니다.');
            return {
                rating: state.rating,
                archetype: state.archetype,
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
        [POST_CON_UP_FAILURE]: (state, action) => {
            if (action.payload.response.status === 403)
                alert('이미 비추천하셨습니다.');
            return {
                rating: state.rating,
                archetype: state.archetype,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_DELETE_SUCCESS]: (state, action) => {
            alert('삭제되었습니다.');
            return {
                rating: state.rating,
                archetype: action.payload.data,
                perPage: state.perPage,
                currentPage: state.currentPage
            };
        },
        [POST_DELETE_FAILURE]: (state, action) => {
            alert('삭제 요청이 거절되었습니다.');
            console.log(action);
            return {
                rating: state.rating,
                archetype: state.archetype,
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
