import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

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

const FB_LOGIN         = 'login/FB_LOGIN';
const FB_LOGIN_SUCCESS = 'login/FB_LOGIN_SUCCESS';
const FB_LOGIN_FAILURE = 'login/FB_LOGIN_FAILURE';

const GOOGLE_LOGIN         = 'login/GOOGLE_LOGIN';
const GOOGLE_LOGIN_SUCCESS = 'login/GOOGLE_LOGIN_SUCCESS';
const GOOGLE_LOGIN_FAILURE = 'login/GOOGLE_LOGIN_FAILURE';

export const fbLogin = createAction(FB_LOGIN);
export const googleLogin = createAction(GOOGLE_LOGIN);

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

};

export function* loginSaga() {
    // 1st arg : action, 2nd arg : func
    // Monitor action, if it occurs, perform the func
    yield takeEvery('login/FB_LOGIN', fbLoginSaga);
    yield takeEvery('login/GOOGLE_LOGIN', googleLoginSaga);
}

// Reducer들은 2가지 매개변수(state, action)을 가지므로 아래 reducer들도 똑같이 해 줄 것
export default handleActions(
    {
        [FB_LOGIN_SUCCESS]: (state, action) => {
            return {
                
            };
        },
        [GOOGLE_LOGIN_SUCCESS]: (state, action) => {
            return {
                
            };
        }
    }, initialState
);