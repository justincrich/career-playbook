import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';

import thunkMiddleware from 'redux-thunk';


const loggerMiddleware = createLogger();

//Reducers
import reducers from '../Reducers/index';



const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunkMiddleware,
    loggerMiddleware));
export default store;
