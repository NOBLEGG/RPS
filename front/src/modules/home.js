import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

function getListAPI() {
    return axios.get('http://localhost:8000/');
}

function getDetailAPI(id) {
    return axios.get('http://localhost:8000/' + id + '/');
}

const GET_LIST         = 'home/GET_LIST';
const GET_LIST_SUCCESS = 'home/GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'home/GET_LIST_FAILURE';

const GET_DETAIL         = 'home/GET_DETAIL';
const GET_DETAIL_SUCCESS = 'home/GET_DETAIL_SUCCESS';
const GET_DETAIL_FAILURE = 'home/GET_DETAIL_FAILURE';

export const getList = createAction(GET_LIST);
export const getDetail = createAction(GET_DETAIL);

function* getListSaga() {
    try {
        const response = yield call(getListAPI);
        yield put({ type: GET_LIST_SUCCESS, payload: response }); // put(action) = dispatch(action)
    } catch (e) {
        yield put({ type: GET_LIST_FAILURE, payload: e });
    }
}

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
    list: [],
    item: {}
};

export function* homeSaga() {
    // 1st arg : action, 2nd arg : func
    // Monitor action, if it occurs, perform the func
    yield takeEvery('home/GET_LIST', getListSaga);
    yield takeEvery('home/GET_DETAIL', getDetailSaga);
}

// Reducer들은 2가지 매개변수(state, action)을 가지므로 아래 reducer들도 똑같이 해 줄 것
export default handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                list: temp
            };
        },
        [GET_DETAIL_SUCCESS]: (state, action) => {
            const temp = action.payload.data;
            return {
                item: temp
            };
        }
    }, initialState
);