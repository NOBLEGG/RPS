import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getCharacterAPI(subject) {
    return axios.get('https://rpspire.gg:8000/character/' + subject + '/');
    // return axios.get('http://localhost:8000/character/' + subject + '/');
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

function changeFilterAPI(subject, filter) {
    return axios.get('https://rpspire.gg:8000/character/' + subject + '/', {
    // return axios.get('http://localhost:8000/character/' + subject + '/', {
        params: {
            filter: filter
        }
    });
}

const GET_CHARACTER         = 'character/GET_CHARACTER';
const GET_CHARACTER_SUCCESS = 'character/GET_CHARACTER_SUCCESS';
const GET_CHARACTER_FAILURE = 'character/GET_CHARACTER_FAILURE';

const POST_PRO_UP         = 'character/POST_PRO_UP';
const POST_PRO_UP_SUCCESS = 'character/POST_PRO_UP_SUCCESS';
const POST_PRO_UP_FAILURE = 'character/POST_PRO_UP_FAILURE';

const POST_CON_UP         = 'character/POST_CON_UP';
const POST_CON_UP_SUCCESS = 'character/POST_CON_UP_SUCCESS';
const POST_CON_UP_FAILURE = 'character/POST_CON_UP_FAILURE';

const CHANGE_FILTER         = 'character/CHANGE_FILTER';
const CHANGE_FILTER_SUCCESS = 'character/CHANGE_FILTER_SUCCESS';
const CHANGE_FILTER_FAILURE = 'character/CHANGE_FILTER_FAILURE';

export const getCharacter = createAction(GET_CHARACTER);
export const postProUp = createAction(POST_PRO_UP);
export const postConUp = createAction(POST_CON_UP);
export const changeFilter = createAction(CHANGE_FILTER);

function* getCharacterSaga(action) {
    try {
        const response = yield call(getCharacterAPI, action.payload.subject);
        yield put({ type: GET_CHARACTER_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_CHARACTER_FAILURE, payload: e });
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

function* changeFilterSaga(action) {
    try {
        const response = yield call(changeFilterAPI, action.payload.subject, action.payload.filter);
        yield put({ type: CHANGE_FILTER_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: CHANGE_FILTER_FAILURE, payload: e });
    }
}

const initialState = {
    opinion: [],
    card: [],
    filter: {
        "common": 0,
        "uncommon": 0,
        "rare": 0,
        "attack": 0,
        "skill": 0,
        "power": 0,
        "X": 0,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "artifact": 0,
        "block": 0,
        "dexterity": 0,
        "ethereal": 0,
        "exhaust": 0,
        "innate": 0,
        "intangible": 0,
        "poison": 0,
        "retain": 0,
        "scry": 0,
        "strength": 0,
        "unplayable": 0,
        "vulnerable": 0,
        "weak": 0,
        "wound": 0
    },
    archetype: []
};

export function* characterSaga() {
    yield takeEvery('character/GET_CHARACTER', getCharacterSaga);

    yield takeEvery('character/POST_PRO_UP', postProUpSaga);
    yield takeEvery('character/POST_CON_UP', postConUpSaga);

    yield takeEvery('character/CHANGE_FILTER', changeFilterSaga);
}

export default handleActions(
    {
        [GET_CHARACTER_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                opinion: res[0],
                card: res[1],
                filter: state.filter,
                archetype: res[2]
            };
        },
        [POST_PRO_UP_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                opinion: res[0],
                card: res[1],
                filter: state.filter,
                archetype: res[2]
            };
        },
        [POST_PRO_UP_FAILURE]: (state, action) => {
            const resCode = action.payload.response.status;
            if (resCode === 403)
                alert('이미 추천하셨습니다.');
            return {
                opinion: state.opinion,
                card: state.card,
                filter: state.filter,
                archetype: state.archetype
            };
        },
        [POST_CON_UP_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                opinion: res[0],
                card: res[1],
                filter: state.filter,
                archetype: res[2]
            };
        },
        [POST_CON_UP_FAILURE]: (state, action) => {
            const resCode = action.payload.response.status;
            if (resCode === 403)
                alert('이미 비추천하셨습니다.');
            return {
                opinion: state.opinion,
                card: state.card,
                filter: state.filter,
                archetype: state.archetype
            };
        },
        [CHANGE_FILTER_SUCCESS]: (state, action) => {
            const res = action.payload.data;
            return {
                opinion: state.opinion,
                card: res,
                filter: state.filter,
                archetype: state.archetype
            };
        }
    }, initialState
);
