import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(data) {
    return axios.post('https://rpspire.gg:8000/create/', data);
}

const POST_FORM         = 'signUp/POST_FORM';
const POST_FORM_SUCCESS = 'signUp/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'signUp/POST_FORM_FAILURE';

export const postForm = createAction(POST_FORM);

function* postFormSaga(action) {
    try {
        const response = yield call(postFormAPI, action.payload);
        yield put({ type: POST_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_FORM_FAILURE, payload: e });
    }
}

const initialState = {
    errorMessage: ""
};

export function* signUpSaga() {
    yield takeEvery('signUp/POST_FORM', postFormSaga);
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
	}
    }, initialState
);
