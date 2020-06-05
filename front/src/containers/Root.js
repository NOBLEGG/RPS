import React from 'react';

import store from 'store';
import { Provider } from 'react-redux';

import { Route, BrowserRouter } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';

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