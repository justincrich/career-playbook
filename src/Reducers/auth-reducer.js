import * as AuthActionTypes from '../ActionTypes/auth-actiontypes';
import * as UserActionTypes from '../ActionTypes/user-actiontypes';
const initialState = {
  isFetching:false,
  email:"",
  name:"",
  password:"",
  confirmPassword:"",
  userId:"",
  receivedAt:Date.now(),
  message:"",
  error:0,
  success:false
};




function AuthReducer(state=initialState,action){

  switch(action.type){
    // REQUEST ONE JOB
    case UserActionTypes.REQUEST_USER:{
      return{
        ...state,isFetching:action.isFetching
      }
    }
    case UserActionTypes.REQUEST_USER_SUCCESS:{
      return{
        ...state,isFetching:action.isFetching
      }
    }
    case UserActionTypes.REQUEST_USER_FAILURE:{
      return{
        ...state,error:action.error,
        isFetching:action.isFetching, message:action.message
      }
    }
    case UserActionTypes.RECEIVE_USER_SUCCESS:{
      return{
        ...state,isFetching:action.isFetching
      }
    }
    case UserActionTypes.RECEIVE_USER_FAILURE:{
      return{
        ...state,isFetching:action.isFetching,
        error:action.error,message:action.message
      }
    }
    case AuthActionTypes.DISMISS_SUCCESS_NOTIFICATION:{
      return{
        ...state,success:action.success
      }
    }
    case AuthActionTypes.DISMISS_NOTIFICATION:{
      return{
        ...state,error:action.error
      }
    }
    case AuthActionTypes.THROW_ERROR:{
      return{
        ...state,error:action.error,message:action.message
      }
    }
    case AuthActionTypes.THROW_SUCCESS:{
      return{
        ...state,success:action.success,message:action.message
      }
    }
    case AuthActionTypes.REQUEST_REGISTER:{
        return {
          ...state,isFetching:action.isFetching,
          email:action.email,
          name:action.name
        }
    }
    case AuthActionTypes.RECEIVE_REGISTER_SUCCESS:{
        return {
          ...state,isFetching:action.isFetching,
          message:action.message,
          receivedAt:action.receivedAt,
          error:action.error,
          success:action.success
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
        ...state,isFetching:action.isFetching, message:action.message,
        receivedAt:action.receivedAt, error:0
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

      }
    }
    default:
      return state;
  }
}

export default AuthReducer;
