import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(data) {
    return axios.post('https://rpspire.gg:8000/api-auth/', data, { withCredentials: true });
}

function fbLoginAPI(access_token) {
    return axios.post(
        'https://localhost:8000/rest-auth/facebook/',
        {
            access_token: access_token
        }
    );
}

function googleLoginAPI(access_token) {
    return axios.post(
        'https://localhost:8000/rest-auth/google/',
        {
            access_token: access_token
        }
    );
}

const POST_FORM         = 'login/POST_FORM';
const POST_FORM_SUCCESS = 'login/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'login/POST_FORM_FAILURE';

const FB_LOGIN         = 'login/FB_LOGIN';
const FB_LOGIN_SUCCESS = 'login/FB_LOGIN_SUCCESS';
const FB_LOGIN_FAILURE = 'login/FB_LOGIN_FAILURE';

const GOOGLE_LOGIN         = 'login/GOOGLE_LOGIN';
const GOOGLE_LOGIN_SUCCESS = 'login/GOOGLE_LOGIN_SUCCESS';
const GOOGLE_LOGIN_FAILURE = 'login/GOOGLE_LOGIN_FAILURE';

export const postForm = createAction(POST_FORM);
export const fbLogin = createAction(FB_LOGIN);
export const googleLogin = createAction(GOOGLE_LOGIN);

function* postFormSaga(action) {
    try {
        const response = yield call(postFormAPI, action.payload);
        yield put({ type: POST_FORM_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: POST_FORM_FAILURE, payload: e });
    }
}

function* fbLoginSaga(access_token) {
    try {
        const response = yield call(fbLoginAPI(access_token));
        yield put({ type: FB_LOGIN_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: FB_LOGIN_FAILURE, payload: e });
    }
}

function* googleLoginSaga(access_token) {
    try {
        const response = yield call(googleLoginAPI(access_token));
        yield put({ type: GOOGLE_LOGIN_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GOOGLE_LOGIN_FAILURE, payload: e });
    }
}

const initialState = {
    errorMessage: ""
};

export function* loginSaga() {
    yield takeEvery('login/POST_FORM', postFormSaga);
    yield takeEvery('login/FB_LOGIN', fbLoginSaga);
    yield takeEvery('login/GOOGLE_LOGIN', googleLoginSaga);
}

export default handleActions(
    {
        [POST_FORM_SUCCESS]: (state, action) => {
            console.log(action);
        },
        [POST_FORM_FAILURE]: (state, action) => {
            return {
                errorMessage: action.payload.isAxiosError
            };
        }
    }, initialState
);
