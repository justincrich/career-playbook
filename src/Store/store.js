import { createStore, combineReducers, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';

import thunkMiddleware from 'redux-thunk';


const loggerMiddleware = createLogger();

//Reducers
import jobsReducer from '../Reducers/jobs-reducer';
import reducers from '../Reducers/index';



const store = createStore(reducers,applyMiddleware(thunkMiddleware,
    loggerMiddleware));
export default store;
