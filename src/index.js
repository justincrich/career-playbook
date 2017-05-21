import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import JobReducer from './Reducers/jobs';
import App from './App';
import './index.css';

const store = createStore(
  JobReducer,
  window.devToolsExtension && window.devToolsExtension()
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
