// 가장 기본적인 Redux 연동 작업(스토어 주입)이 있는 컨테이너 컴포넌트

import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import combineReducers, { rootSaga } from 'modules/index';

import createSagaMiddleware from 'redux-saga';

import { Route, BrowserRouter, Switch } from 'react-router-dom';

import NavBar from 'presentations/NavBar';
// import LoginContainer from 'containers/LoginContainer';
import HomeContainer from 'containers/HomeContainer';
import HomeDetailContainer from 'containers/HomeDetailContainer';
import IroncladContainer from 'containers/IroncladContainer';
import SilentContainer from 'containers/SilentContainer';
import OpinionContainer from 'containers/OpinionContainer';
import ArchetypeContainer from 'containers/ArchetypeContainer';
import CardContainer from 'containers/CardContainer';
import CardDetailContainer from 'containers/CardDetailContainer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomeContainer} />

          {/* <Route exact path="/login" component={LoginContainer} /> */}

          <Route exact path="/notice/:id" component={HomeDetailContainer} />
          <Route exact path="/character/ironclad" component={IroncladContainer} />
          <Route exact path="/character/silent" component={SilentContainer} />
          
          <Route exact path="/opinion/:subject" component={OpinionContainer} />
          <Route exact path="/archetype/:subject" component={ArchetypeContainer} />

          <Route exact path="/card" component={CardContainer} />
          <Route exact path="/card/:subject" component={CardDetailContainer} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;