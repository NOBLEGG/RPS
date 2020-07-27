import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getListAPI() {
    return axios.get('http://localhost:8000/cards/');
}

function changeKeywordAPI(keyword) {
    return axios.get('http://localhost:8000/cards/', {
        params: {
            keyword: keyword
        }
    });
}

function getDetailAPI(subject) {
    return axios.get('http://localhost:8000/card/' + subject + '/');
}

const GET_LIST         = 'card/GET_LIST';
const GET_LIST_SUCCESS = 'card/GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'card/GET_LIST_FAILURE';

const CHANGE_KEYWORD = 'card/CHANGE_KEYWORD';
const CHANGE_KEYWORD_SUCCESS = 'card/CHANGE_KEYWORD_SUCCESS';
const CHANGE_KEYWORD_FAILURE = 'card/CHANGE_KEYWORD_FAILURE';

const GET_DETAIL         = 'card/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'card/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'card/GET_DETAIL_FAILURE';

export const getList = createAction(GET_LIST);
export const changeKeyword = createAction(CHANGE_KEYWORD);
export const getDetail = createAction(GET_DETAIL);

function* getListSaga() {
    try {
        const response = yield call(getListAPI);
        yield put({ type: GET_LIST_SUCCESS, payload: response }); // put(action) = dispatch(action)
    } catch (e) {
        yield put({ type: GET_LIST_FAILURE, payload: e });
    }
}

function* changeKeywordSaga(action) {
    try {
        const response = yield call(changeKeywordAPI, action.payload.keyword);
        yield put({ type: CHANGE_KEYWORD_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: CHANGE_KEYWORD_FAILURE, payload: e });
    }
}

function* getDetailSaga(action) {
    try {
        // call 두 번째 인자는 getDetailAPI의 매개변수에 들어감
        const response = yield call(getDetailAPI, action.payload);
        yield put({ type: GET_DETAIL_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_DETAIL_FAILURE, payload: e });
    }
}

const initialState = {
    cards: [],
    card: {},
    opinion: [],
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

export function* cardSaga() {
    yield takeEvery('card/GET_LIST', getListSaga);
    yield takeEvery('card/CHANGE_KEYWORD', changeKeywordSaga);
    yield takeEvery('card/GET_DETAIL', getDetailSaga);
}

// Reducer들은 2가지 매개변수(state, action)을 가지므로 아래 reducer들도 똑같이 해 줄 것
export default handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => {
            const cards = action.payload.data;
            return {
                cards: cards,
                keyword: state.keyword
            };
        },
        [CHANGE_KEYWORD_SUCCESS]: (state, action) => {
            const cards = action.payload.data;
            return {
                cards: cards,
                keyword: state.keyword
            };
        },
        [GET_DETAIL_SUCCESS]: (state, action) => {
            const card = action.payload.data[0];
            const opinion = action.payload.data[1];
            return {
                card: card,
                opinion: opinion
            };
        }
    }, initialState
);