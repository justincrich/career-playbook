import { combineReducers } from 'redux';

//Reducers
import jobsReducer from './jobs-reducer';
import companiesReducer from './companies-reducer';
import authReducer from './auth-reducer';
// import userReducer from './user-reducer';

//Combine Reducers
var reducers = combineReducers({
  jobsState:jobsReducer,
  companiesState:companiesReducer,
  authState:authReducer
  // userState:userReducer
});

export default reducers;
