import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getListAPI() {
    return axios.get('http://rpspire.gg:8000/card/');
    // return axios.get('http://localhost:8000/card/');
}

function changeFilterAPI(filter) {
    return axios.get('http://rpspire.gg:8000/card/', {
    // return axios.get('http://localhost:8000/card/', {
        params: {
            filter: filter
        }
    });
}

const GET_LIST         = 'card/GET_LIST';
const GET_LIST_SUCCESS = 'card/GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'card/GET_LIST_FAILURE';

const CHANGE_FILTER         = 'card/CHANGE_FILTER';
const CHANGE_FILTER_SUCCESS = 'card/CHANGE_FILTER_SUCCESS';
const CHANGE_FILTER_FAILURE = 'card/CHANGE_FILTER_FAILURE';

export const getList = createAction(GET_LIST);
export const changeFilter = createAction(CHANGE_FILTER);

function* getListSaga() {
    try {
        const response = yield call(getListAPI);
        yield put({ type: GET_LIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_LIST_FAILURE, payload: e });
    }
}

function* changeFilterSaga(action) {
    try {
        const response = yield call(changeFilterAPI, action.payload.filter);
        yield put({ type: CHANGE_FILTER_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: CHANGE_FILTER_FAILURE, payload: e });
    }
}

const initialState = {
    card: [],
    filter: {
        "ironclad": 0,
        "silent": 0,
        "defect": 0,
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
    specificCard: {}
};

export function* cardSaga() {
    yield takeEvery('card/GET_LIST', getListSaga);
    yield takeEvery('card/CHANGE_FILTER', changeFilterSaga);
}

// Reducer들은 2가지 매개변수(state, action)을 가지므로 아래 reducer들도 똑같이 해 줄 것
export default handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => {
            const card = action.payload.data;
            return {
                card: card,
                filter: state.filter
            };
        },
        [CHANGE_FILTER_SUCCESS]: (state, action) => {
            const card = action.payload.data;
            return {
                card: card,
                filter: state.filter
            };
        }
    }, initialState
);
