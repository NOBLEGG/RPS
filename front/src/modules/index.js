// 모듈 : Reducer + 액션( + 사가)
// 모든 스토어 내 모듈을 불러와서 합치는 역할

import { combineReducers } from 'redux';
import home, { homeSaga } from 'modules/home';
import login, { loginSaga } from 'modules/login';
import signUp, { signUpSaga } from 'modules/signUp';
import character, { characterSaga } from 'modules/character';
import card, { cardSaga } from 'modules/card';
import cardDetail, { cardDetailSaga } from 'modules/cardDetail';
import opinion, { opinionSaga } from 'modules/opinion';
import archetype, { archetypeSaga } from 'modules/archetype';
import relic, { relicSaga } from 'modules/relic';
import relicDetail, { relicDetailSaga } from 'modules/relicDetail';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([homeSaga(), loginSaga(), signUpSaga(), characterSaga(), cardSaga(), cardDetailSaga(), opinionSaga(), archetypeSaga(), relicSaga(), relicDetailSaga()]);
}

export default combineReducers({
    home,
    login,
    signUp,
    character,
    card,
    cardDetail,
    opinion,
    archetype,
    relic,
    relicDetail
});