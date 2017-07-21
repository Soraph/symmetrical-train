import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';

import rootReducer from './modules';
import App from './components/App';
import Home from './containers/HomeContainer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Home />
    </App>
  </Provider>,
  document.getElementById('root')
);
