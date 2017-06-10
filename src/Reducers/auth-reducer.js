import * as AuthActionTypes from '../ActionTypes/auth-actiontypes';

const initialState = {
  isFetching:false,
  email:"",
  name:"",
  password:"",
  confirmPassword:"",
  userId:"",
  receivedAt:Date.now(),
  message:"",
  auth:0,
  error:0,
  success:false
};




function AuthReducer(state=initialState,action){

  switch(action.type){
    // REQUEST ONE JOB
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
          message:action.message,userId:action.userId,
          receivedAt:action.receivedAt,
          auth:action.auth,
          error:action.error,
          success:action.success
        }
    }
    case AuthActionTypes.RECEIVE_REGISTER_FAILURE:{
        return {
          ...state,isFetching:action.isFetching,
          message:action.message,
          userId:-1,
          receivedAt:action.receivedAt,
          error:action.error,
          auth:action.success
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
        receivedAt:action.receivedAt, auth:action.auth,
        error:0
      }
    }
    case AuthActionTypes.RECEIVE_LOGIN_FAILURE:{
      console.log("error",action.error);
      return{
        ...state,isFetching:action.isFetching,
        userId:-1,message:action.message,
        receivedAt:action.receivedAt,
        auth:action.auth, error:action.error
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
        auth:1,error:0

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

  console.log("state",state);
}

export default AuthReducer;
