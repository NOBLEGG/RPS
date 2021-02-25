import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(data) {
    let checker = false;
    const cookies = document.cookie.split(';');
    let x;
    for (let i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf('='));
        x = x.replace(/^\s+|\s+$/g, '');
        if (x === 'staff')
            checker = true;
    }

    if (checker === true)
        return axios.post('https://rpspire.gg:8000/add/', data);
    else
        alert('ERROR');
}

function getCurrentUsersAPI() {
    return axios.get('https://rpspire.gg:8000/current/');
}

const POST_FORM         = 'noticeAdd/POST_FORM';
const POST_FORM_SUCCESS = 'noticeAdd/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'noticeAdd/POST_FORM_FAILURE';

const GET_CURRENT_USERS         = 'noticeAdd/GET_CURRENT_USERS';
const GET_CURRENT_USERS_SUCCESS = 'noticeAdd/GET_CURRENT_USERS_SUCCESS';
const GET_CURRENT_USERS_FAILURE = 'noticeAdd/GET_CURRENT_USERS_FAILURE';

export const postForm = createAction(POST_FORM);
export const getCurrentUsers = createAction(GET_CURRENT_USERS);

function* postFormSaga(action) {
    try {
        const response = yield call(postFormAPI, action.payload);
        yield put({ type: POST_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_FORM_FAILURE, payload: e });
    }
}

function* getCurrentUsersSaga() {
    try {
        const response = yield call(getCurrentUsersAPI);
        yield put({ type: GET_CURRENT_USERS_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_CURRENT_USERS_FAILURE, payload: e });
    }
}

const initialState = {

}

export function* noticeAddSaga() {
    yield takeEvery('noticeAdd/POST_FORM', postFormSaga);
    yield takeEvery('noticeAdd/GET_CURRENT_USERS', getCurrentUsersSaga);
}

export default handleActions(
    {
        [POST_FORM_SUCCESS]: (state, action) => {
            console.log("SUCCESS");
        },
        [GET_CURRENT_USERS_SUCCESS]: (state, action) => {
            console.log(action.payload);
            alert(action.payload);
        }
    }, initialState
);

