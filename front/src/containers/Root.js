// 가장 기본적인 Redux 연동 작업(스토어 주입)이 있는 컨테이너 컴포넌트

import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import combineReducers, { rootSaga } from 'modules/index';

import createSagaMiddleware from 'redux-saga';

import { Route, BrowserRouter, Switch } from 'react-router-dom';

import NavBarContainer from 'containers/NavBarContainer';
import LoginContainer from 'containers/LoginContainer';
import SignUpContainer from 'containers/SignUpContainer';
import HomeContainer from 'containers/HomeContainer';
import HomeDetailContainer from 'containers/HomeDetailContainer';
import IroncladContainer from 'containers/IroncladContainer';
import SilentContainer from 'containers/SilentContainer';
import DefectContainer from 'containers/DefectContainer';
import OpinionContainer from 'containers/OpinionContainer';
import ArchetypeContainer from 'containers/ArchetypeContainer';
import CardContainer from 'containers/CardContainer';
import CardDetailContainer from 'containers/CardDetailContainer';
import RelicContainer from 'containers/RelicContainer';
import RelicDetailContainer from 'containers/RelicDetailContainer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBarContainer />
        <Switch>
          <Route exact path="/" component={HomeContainer} />

          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/signup" component={SignUpContainer} />

          <Route exact path="/notice/:id" component={HomeDetailContainer} />
          <Route exact path="/character/ironclad" component={IroncladContainer} />
          <Route exact path="/character/silent" component={SilentContainer} />
          <Route exact path="/character/defect" component={DefectContainer} />
          
          <Route exact path="/opinion/character/:character" component={OpinionContainer} />
          <Route exact path="/archetype/:subject" component={ArchetypeContainer} />

          <Route exact path="/card" component={CardContainer} />
          <Route exact path="/card/:character/:card" component={CardDetailContainer} />
          <Route exact path="/opinion/card/:character/:card" component={OpinionContainer} />

          <Route exact path="/relic" component={RelicContainer} />
          <Route exact path="/relic/:relic" component={RelicDetailContainer} />
          <Route exact path="/opinion/relic/:relic" component={OpinionContainer} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;