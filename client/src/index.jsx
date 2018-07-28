import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppReducer from './reducers';

import AppRouter from './routers/AppRouter.jsx';

let store = createStore(AppReducer);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, document.getElementById('app'));
