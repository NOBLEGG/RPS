import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(subject, data) {
    return axios.post('http://localhost:8000/opinion/' + subject + '/', data);
}

function getListAPI(subject) {
    return axios.get('http://localhost:8000/opinion/' + subject + '/');
}

const POST_FORM = 'character/POST_FORM';
const POST_FORM_SUCCESS = 'character/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'character/POST_FORM_FAILURE';

const GET_LIST = 'character/GET_LIST';
const GET_LIST_SUCCESS = 'character/GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'character/GET_LIST_FAILURE';

export const postForm = createAction(POST_FORM);
export const getList = createAction(GET_LIST);

function* postFormSaga(action) {
    try {
        const response = yield call(postFormAPI, action.payload);
        yield put({ type: POST_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_FORM_FAILURE, payload: e });
    }
}

function* getListSaga(action) {
    try {
        const response = yield call(getListAPI, action.payload);
        yield put({ type: GET_LIST_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_LIST_FAILURE, payload: e });
    }
}

const initialState = {
    list: []
};

export function* characterSaga() {
    yield takeEvery('character/POST_FORM', postFormSaga);
    yield takeEvery('character/GET_LIST', getListSaga);
}

export default handleActions(
    {
        [POST_FORM_SUCCESS]: (state, action) => {
            return {
                
            };
        },
        [GET_LIST_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        }
    }, initialState
);