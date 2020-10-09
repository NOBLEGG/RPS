import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function postFormAPI(data) {
    let checker = false;
    const cookies = document.cookie.split(';');
    let x, y;
    for (let i = 0; i < cookies.length; i++) {
        x = cookies[i].substr(0, cookies[i].indexOf('='));
        y = cookies[i].substr(cookies[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x === 'staff')
            checker = true;
    }

    if (checker === true)
        return axios.post('https://rpspire.gg:8000/add/', data);
    else
        alert('ERROR');
}

const POST_FORM         = 'noticeAdd/POST_FORM';
const POST_FORM_SUCCESS = 'noticeAdd/POST_FORM_SUCCESS';
const POST_FORM_FAILURE = 'noticeAdd/POST_FORM_FAILURE';

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

}

export function* noticeAddSaga() {
    yield takeEvery('noticeAdd/POST_FORM', postFormSaga);
}

export default handleActions(
    {
        [POST_FORM_SUCCESS]: (state, action) => {
            console.log("SUCCESS");
        }
    }, initialState
);

