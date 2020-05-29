// 모든 스토어 내 모듈을 불러와서 합치는 역할

import { combineReducers } from 'redux';
import home from 'store/modules/home';

export default combineReducers({
  home
});