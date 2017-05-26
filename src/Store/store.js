import { createStore, combineReducers, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';

import thunkMiddleware from 'redux-thunk';


const loggerMiddleware = createLogger();

//Reducers
import jobsReducer from '../Reducers/jobs-reducer';



const store = createStore(jobsReducer,applyMiddleware(thunkMiddleware,
    loggerMiddleware));
export default store;
