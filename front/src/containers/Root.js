// 가장 기본적인 Redux 연동 작업(스토어 주입)이 있는 컨테이너 컴포넌트

import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import combineReducers, { rootSaga } from 'modules/index';

import createSagaMiddleware from 'redux-saga';

import { Route, BrowserRouter } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={HomeContainer} />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;