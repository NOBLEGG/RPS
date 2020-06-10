// 모듈 : Reducer + 액션, 액션을 만들 때 타입 앞에 도메인을 추가하여 서로 다른 모듈에서 같은 액션 이름을 가질 수 있도록 하는 게 좋음
// 모든 스토어 내 모듈을 불러와서 합치는 역할

import { combineReducers } from 'redux';
import home from 'modules/home';

export default combineReducers({
    home
});