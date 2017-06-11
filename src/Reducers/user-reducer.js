import * as UserActionTypes from '../ActionTypes/user-actiontypes';
import * as AuthActionTypes from '../ActionTypes/auth-actiontypes';
import { combineReducers } from 'redux';
import Fuse from 'fuse.js';

const initialState = {
    user:undefined,
    isFetching:false

};




function UserReducer(state=initialState,action){

  switch(action.type){
    // REQUEST ONE JOB
    case AuthActionTypes.RECEIVE_LOGOUT_SUCCESS:{
        return {
          ...state,isFetching:action.isFetching,
          user:action.user
        }
    }
    case UserActionTypes.REQUEST_USER:{
        return {
          ...state,isFetching:action.isFetching
        }
    }
    case AuthActionTypes.RECEIVE_USER_SUCCESS:{
        return {
          ...state,isFetching:action.isFetching,
          user:action.user
        }
    }
    case UserActionTypes.REQUEST_USER_SUCCESS:{
        return {
          ...state,isFetching:action.isFetching,
          user:action.user
        }
    }
    case UserActionTypes.REQUEST_USER_FAILURE:{
        return {
          ...state,isFetching:action.isFetching,
          user:action.user
        }
    }
    default:
      return state;
  }


}

export default UserReducer;
