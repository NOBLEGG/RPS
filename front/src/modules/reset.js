import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(data) {
    return axios.post('https://rpspire.gg:8000/reset/', data);
}

function resetConfirmAPI(uid, token, value) {
    console.log(uid);
    console.log(token);
    return axios.put('https://rpspire.gg:8000/resetconfirm/' + uid + '/' + token + '/', value);
}

const POST_FORM         = 'reset/POST_FORM';
const POST_FORM_SUCCESS = 'reset/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'reset/POST_FORM_FAILURE';

const RESET_CONFIRM         = 'reset/RESET_CONFIRM';
const RESET_CONFIRM_SUCCESS = 'reset/RESET_CONFIRM_SUCCESS';
const RESET_CONFIRM_FAILURE = 'reset/RESET_CONFIRM_FAILURE';

const ALERTED = 'reset/ALERTED'

export const postForm = createAction(POST_FORM);
export const resetConfirm = createAction(RESET_CONFIRM);
export const alerted = createAction(ALERTED);

function* postFormSaga(action) {
    try {
        const response = yield call(postFormAPI, action.payload);
        yield put({ type: POST_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_FORM_FAILURE, payload: e });
    }
}

function* resetConfirmSaga(action) {
    try {
        const response = yield call(resetConfirmAPI, action.payload.uid, action.payload.token, action.payload.value);
        yield put({ type: RESET_CONFIRM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: RESET_CONFIRM_FAILURE, payload: e });
    }
}

const initialState = {
    errorMessage: '',
    isSuccess: false
};

export function* resetSaga() {
    yield takeEvery('reset/POST_FORM', postFormSaga);
    yield takeEvery('reset/RESET_CONFIRM', resetConfirmSaga);
}

export default handleActions(
    {
        [POST_FORM_SUCCESS]: (state, action) => {
            console.log(action);
        },
	    [POST_FORM_FAILURE]: (state, action) => {
	        return {
	            errorMessage: action.payload.response.data.message
	        };
	    },
        [RESET_CONFIRM_SUCCESS]: (state, action) => {
            return {
                isSuccess: true
            };
        },
        [RESET_CONFIRM_FAILURE]: (state, action) => {
            console.log(action);
            return {
                errorMessage: action.payload.response.data.message
            };
        },
        [ALERTED]: (state, action) => {
            return {
                errorMessage: ''
            }
        }
    }, initialState
);

