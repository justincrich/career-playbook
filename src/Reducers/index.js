import { combineReducers } from 'redux';

//Reducers
import jobsReducer from './jobs-reducer';
import companiesReducer from './companies-reducer';

//Combine Reducers
var reducers = combineReducers({
  jobsState:jobsReducer,
  companiesState:companiesReducer
});

export default reducers;
