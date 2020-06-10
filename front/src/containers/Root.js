// 가장 기본적인 Redux 연동 작업(스토어 주입)이 있는 컨테이너 컴포넌트

import React from 'react';

import store from 'store';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from 'modules/index';

import { Route, BrowserRouter } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';

const store = createStore(combineReducers);

const Root = () => {
  return (
    // 아래 컴포넌트에서 스토어를 사용할 수 있게 해 줌
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={HomeContainer} />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;