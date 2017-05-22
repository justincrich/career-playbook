import { createStore, combineReducers } from 'redux';

//Reducers
import jobsReducer from '../Reducers/jobs-reducer';



const store = createStore(jobsReducer,window.devToolsExtension && window.devToolsExtension());
export default store;
