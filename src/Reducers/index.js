import { combineReducers } from 'redux';

//Reducers
import jobsReducer from './jobs-reducer';

//Combine Reducers
var reducers = combineReducers({
  jobsState:jobsReducer
});

export default reducers;
