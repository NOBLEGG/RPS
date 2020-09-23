import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(data) {
    const cookies = document.cookie.split(';');
    let x, y;
    for (let i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf('='));
        y = cookies[i].substr(cookies[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x === 'email') {
            y = y.substr(1, y.length - 2);
            data['email'] = y;
        }
    }
    return axios.post('https://rpspire.gg:8000/delete/', data);
}

const POST_FORM         = 'deleteUser/POST_FORM';
const POST_FORM_SUCCESS = 'deleteUser/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'deleteUser/POST_FORM_FAILURE';

const ALERTED = 'deleteUser/ALERTED'

export const postForm = createAction(POST_FORM);
export const alerted = createAction(ALERTED);

function* postFormSaga(action) {
    try {
        const response = yield call(postFormAPI, action.payload);
        yield put({ type: POST_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_FORM_FAILURE, payload: e });
    }
}

const initialState = {
    isSuccess: false,
    errorMessage: ''
};

export function* deleteUserSaga() {
    yield takeEvery('deleteUser/POST_FORM', postFormSaga);
}

export default handleActions(
    {
        [POST_FORM_SUCCESS]: (state, action) => {
            return {
                isSuccess: true
            }
        },
        [POST_FORM_FAILURE]: (state, action) => {
            return {
                errorMessage: action.payload.response.data.message
            }
        },
        [ALERTED]: (state, action) => {
            return {
                errorMessage: ''
            }
        }
    }, initialState
);
