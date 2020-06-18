import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getListAPI() {
    return axios.get('http://localhost:8000/');
}

const GET_LIST         = 'home/GET_LIST';
const GET_LIST_SUCCESS = 'home/GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'home/GET_LIST_FAILURE';

export const getList = createAction(GET_LIST);

function* getListSaga() {
    try {
        const response = yield call(getListAPI);
        yield put({ type: GET_LIST_SUCCESS, payload: response }); // put(action) = dispatch(action)
    } catch (e) {
        yield put({ type: GET_LIST_FAILURE, payload: e });
    }
}

const initialState = {
    list: []
};

export function* homeSaga() {
    // 1st arg : action, 2nd arg : func
    // Monitor action, if it occurs, perform the func
    yield takeEvery('home/GET_LIST', getListSaga);
}

// Reducer들은 2가지 매개변수(state, action)을 가지므로 아래 reducer들도 똑같이 해 줄 것
export default handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        }
    }, initialState
);