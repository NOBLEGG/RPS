// 모듈 : Reducer + 액션( + 사가)
// 모든 스토어 내 모듈을 불러와서 합치는 역할

import { combineReducers } from 'redux';
import home, { homeSaga } from 'modules/home';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([homeSaga()]);
}

export default combineReducers({
    home
});