import * as AuthActionTypes from '../ActionTypes/auth-actiontypes';
import { combineReducers } from 'redux';
import Fuse from 'fuse.js';

const initialState = {
  isFetching:false,
  email:"",
  name:"",
  password:"",
  confirmPassword:"",
  userId:"",
  receivedAt:Date.now(),
  message:"",
  auth:0
};




function AuthReducer(state=initialState,action){

  switch(action.type){
    // REQUEST ONE JOB
    case AuthActionTypes.REQUEST_REGISTER:{
        return {
          ...state,isFetching:action.isFetching,
          email:action.email,
          name:action.name,
          password:action.password,
          confirmPassword:action.confirmPassword
        }
    }
    case AuthActionTypes.RECEIVE_REGISTER_SUCCESS:{
        return {
          ...state,isFetching:action.isFetching,
          message:action.message,userId:action.userId,
          receivedAt:action.receivedAt,
        }
    }
    case AuthActionTypes.RECEIVE_REGISTER_FAILURE:{
        return {
          ...state,isFetching:action.isFetching,
          message:action.message,
          userId:-1,
          receivedAt:action.receivedAt,
        }
    }
    case AuthActionTypes.REQUEST_LOGIN:{
      return{
        ...state,isFetching:action.isFetching,
        email:action.email
      }
    }
    case AuthActionTypes.RECEIVE_LOGIN_SUCCESS:{
      return{
        ...state,isFetching:action.isFetching,
        userId:action.userId,message:action.message,
        receivedAt:action.receivedAt, auth:action.auth
      }
    }
    case AuthActionTypes.RECEIVE_LOGIN_FAILURE:{
      return{
        ...state,isFetching:action.isFetching,
        userId:-1,message:action.message,
        receivedAt:action.receivedAt,auth:action.auth
      }
    }
    case AuthActionTypes.RECEIVE_LOGOUT:{
      return{
        ...state,isFetching:action.isFetching
      }
    }
    case AuthActionTypes.RECEIVE_LOGOUT_SUCCESS:{
      return{
        ...state,isFetching:action.isFetching,message:action.message,
        auth:0

      }
    }
    case AuthActionTypes.CHANGE_AUTH_STATUS:{
      return{
        ...state,auth:action.auth
      }
    }
    default:
      return state;
  }


}

export default AuthReducer;
