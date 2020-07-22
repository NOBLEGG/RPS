import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getCharacterAPI(subject, keyword) {
    return axios.get('http://localhost:8000/' + subject + '/');
}

function changeKeywordAPI(subject, keyword) {
    return axios.get('http://localhost:8000/' + subject + '/', {
        params: {
            keyword: keyword
        }
    });
}

function postOpinionFormAPI(subject, data) {
    return axios.post('http://localhost:8000/opinion/' + subject + '/', data);
}

function getOpinionListAPI(subject) {
    return axios.get('http://localhost:8000/opinion/' + subject + '/');
}

function postArchetypeFormAPI(subject, data) {
    return axios.post('http://localhost:8000/archetype/' + subject + '/', data);
}

function getArchetypeListAPI(subject) {
    return axios.get('http://localhost:8000/archetype/' + subject + '/');
}

const GET_CHARACTER = 'character/GET_CHARACTER';
const GET_CHARACTER_SUCCESS = 'character/GET_CHARACTER_SUCCESS';
const GET_CHARACTER_FAILURE = 'character/GET_CHARACTER_FAILURE';

const CHANGE_KEYWORD = 'character/CHANGE_KEYWORD';
const CHANGE_KEYWORD_SUCCESS = 'character/CHANGE_KEYWORD_SUCCESS';
const CHANGE_KEYWORD_FAILURE = 'character/CHANGE_KEYWORD_FAILURE';

const POST_OPINION_FORM = 'character/POST_OPINION_FORM';
const POST_OPINION_FORM_SUCCESS = 'character/POST_OPINION_FORM_SUCCESS';
const POST_OPINION_FORM_FAILURE = 'character/POST_OPINION_FORM_FAILURE';

const GET_OPINION_LIST = 'character/GET_OPINION_LIST';
const GET_OPINION_LIST_SUCCESS = 'character/GET_OPINION_LIST_SUCCESS';
const GET_OPINION_LIST_FAILURE = 'character/GET_OPINION_LIST_FAILURE';

const POST_ARCHETYPE_FORM = 'character/POST_ARCHETYPE_FORM';
const POST_ARCHETYPE_FORM_SUCCESS = 'character/POST_ARCHETYPE_FORM_SUCCESS';
const POST_ARCHETYPE_FORM_FAILURE = 'character/POST_ARCHETYPE_FORM_FAILURE';

const GET_ARCHETYPE_LIST = 'character/GET_ARCHETYPE_LIST';
const GET_ARCHETYPE_LIST_SUCCESS = 'character/GET_ARCHETYPE_LIST_SUCCESS';
const GET_ARCHETYPE_LIST_FAILURE = 'character/GET_ARCHETYPE_LIST_FAILURE';

export const getCharacter = createAction(GET_CHARACTER);
export const changeKeyword = createAction(CHANGE_KEYWORD);

export const postOpinionForm = createAction(POST_OPINION_FORM);
export const getOpinionList = createAction(GET_OPINION_LIST);

export const postArchetypeForm = createAction(POST_ARCHETYPE_FORM);
export const getArchetypeList = createAction(GET_ARCHETYPE_LIST);

function* getCharacterSaga(action) {
    try {
        const response = yield call(getCharacterAPI, action.payload.subject);
        yield put({ type: GET_CHARACTER_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_CHARACTER_FAILURE, payload: e });
    }
}

function* changeKeywordSaga(action) {
    try {
        const response = yield call(changeKeywordAPI, action.payload.subject, action.payload.keyword);
        yield put({ type: CHANGE_KEYWORD_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: CHANGE_KEYWORD_FAILURE, payload: e });
    }
}

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

const initialState = {
    list: [],
    keyword: {
        "artifact": 0,
        "block": 0,
        "dexterity": 0,
        "ethereal": 0,
        "exhaust": 0,
        "innate": 0,
        "intangible": 0,
        "retain": 0,
        "scry": 0,
        "strength": 0,
        "unplayable": 0,
        "vulnerable": 0,
        "weak": 0,
        "wound": 0
    }
};

export function* characterSaga() {
    yield takeEvery('character/GET_CHARACTER', getCharacterSaga);

    yield takeEvery('character/CHANGE_KEYWORD', changeKeywordSaga);

    yield takeEvery('character/POST_OPINION_FORM', postOpinionFormSaga);
    yield takeEvery('character/GET_OPINION_LIST', getOpinionListSaga);

    yield takeEvery('character/POST_ARCHETYPE_FORM', postArchetypeFormSaga);
    yield takeEvery('character/GET_ARCHETYPE_LIST', getArchetypeListSaga);
}

export default handleActions(
    {
        [GET_CHARACTER_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp,
                keyword: state.keyword
            };
        },
        [CHANGE_KEYWORD_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp,
                keyword: state.keyword
            };
        },
        [GET_OPINION_LIST_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        },
        [POST_OPINION_FORM_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        },
        [GET_ARCHETYPE_LIST_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        },
        [POST_ARCHETYPE_FORM_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        }
    }, initialState
);