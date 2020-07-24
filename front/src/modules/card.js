import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getDetailAPI(subject) {
    return axios.get('http://localhost:8000/card/' + subject + '/');
}

const GET_DETAIL         = 'card/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'card/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'card/GET_DETAIL_FAILURE';

export const getDetail = createAction(GET_DETAIL);

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
    card: {},
    opinion: []
};

export function* cardSaga() {
    yield takeEvery('card/GET_DETAIL', getDetailSaga);
}

// Reducer들은 2가지 매개변수(state, action)을 가지므로 아래 reducer들도 똑같이 해 줄 것
export default handleActions(
    {
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