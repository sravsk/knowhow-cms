import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import AppReducer from './reducers';

import AppRouter from './routers/AppRouter.jsx';

let store = createStore(AppReducer);

ReactDOM.render(<AppRouter store={store}/>, document.getElementById('app'));
