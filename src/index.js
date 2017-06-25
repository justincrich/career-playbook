import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './Store/store';
import Radium, { StyleRoot } from 'radium'
import normalize from 'radium-normalize';
import './Styles/CSS/App.css';


ReactDOM.render(
  <StyleRoot className="h-100">
    <Provider store={store}>
      <App/>
    </Provider>
  </StyleRoot>,
  document.getElementById('root')
);
