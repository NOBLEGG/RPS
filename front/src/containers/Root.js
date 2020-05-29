import React from 'react';

import store from 'store';
import { Provider } from 'react-redux';

import { Route, BrowserRouter } from 'react-router-dom';

import Home from 'presentations/Home';

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;