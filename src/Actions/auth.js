import * as ActionTypes from '../ActionTypes/auth-actiontypes';
import * as UserActions from './user';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';

//Dismiss Errors
export const dismissError = ()=>{
  return{
    type: ActionTypes.DISMISS_NOTIFICATION,
    error:0
  };
}

//Dismiss SuccessNotification
export const dismissSuccess = () =>{
  return{
    type:ActionTypes.DISMISS_SUCCESS_NOTIFICATION,
    success:false
  };
}

export const throwSuccess=(successMsg)=>{
  return{
    type:ActionTypes.THROW_SUCCESS,
    success:true,
    message:successMsg
  };
}

//Throw Error
export const throwError=(errMessage)=>{
  return{
    type: ActionTypes.THROW_ERROR,
    error:1,
    message:errMessage
  };
}

//Regester
export const requestRegister=(email,name)=>{
  return{
    type: ActionTypes.REQUEST_REGISTER,
    isFetching:true,
    email:email,
    name:name,
  };
}

export const receiveRegister=(resp)=>{

    return{
      type:ActionTypes.RECEIVE_REGISTER_SUCCESS,
      isFetching:false,
      message: resp.message,
      receivedAt:Date.now(),
      error:0,
      success:true
    };

}


//Thunk action handlers
export function fetchRegister(email,name,password,confirmPassword){
  return function(dispatch){
    //Update state to inform app we're processing
    dispatch(requestRegister(email,name));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.REGISTER;
    var init = {
      method:'POST',
      mode:'same-origin',
      body:JSON.stringify(
        {
          email:email,
          name:name,
          password:password,
          confirmPassword:confirmPassword
        }
      ),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    };

    var req = new Request(Endpoints.REGISTER,init);

    return fetch(req)
      .then(response=>{
        if(!response.ok && response.status == 500){
          var err = new Error('Cannot create user');
          err.status = 500;
          throw err;
        }
        return response.json();
      }).then(json=>{
        dispatch(receiveRegister(json));
        dispatch(throwSuccess("Registered, you may now login."));
      })
      .catch(error=>{
        dispatch(throwError(error.message));
      });

  }
}

//Login
export const requestLogin=(email)=>{
  return{
    type: ActionTypes.REQUEST_LOGIN,
    isFetching:true,
    email:email
  };
}

export const receiveLogin=(resp)=>{
  return{
    type:ActionTypes.RECEIVE_LOGIN_SUCCESS,
    isFetching:false,
    message: resp.message,
    user:resp.user,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchLogin(email,password){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestLogin(email));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.LOGIN;
    var init = {
      method:'POST',
      mode:'same-origin',
      credentials:'same-origin',
      body:JSON.stringify({
        email:email,
        password:password
      }),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }

    var req = new Request(Endpoints.LOGIN,init);
    return fetch(req)
      .then(response=>{
        if(response.ok){
          return response.json().then(json=>{
            dispatch(receiveLogin(json));
          });
        }else if (response.status == 401){
          dispatch(throwError("Invalid Username or Password"));
        }else if (response.status == 400){
            dispatch(throwError("You missed a field ... please try again!"));
        }
      }).catch(error=>{

      });

  }
}



//GET: LOGOUT
export const requestLogout=()=>{

  return{
    type: ActionTypes.REQUEST_LOGOUT,
    isFetching:true,
  };
}

export const receiveLogout=(json)=>{
  return{
    type:ActionTypes.RECEIVE_LOGOUT_SUCCESS,
    isFetching:false,
    message: json.message,
    receivedAt:Date.now(),
    user:undefined
  };
}

//Thunk action handlers
export function fetchLogOut(){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestLogout());
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.LOGOUT;
    var init = {method:'GET', mode:'same-origin',credentials:'include'}
    var req = new Request(Endpoints.LOGOUT,init);

    return fetch(req)
      .then(response=>{
        if(response.ok){
          response.json().then(json=>{
            dispatch(receiveLogout(json));
          });
        }
      })
      // .then(json=>
        // console.log("response",json)
        // dispatch(receiveLogout(json))
        // console.log(receiveJob(_jid,json))
      .catch(error=>console.log("Error in Actions.Jobs.fetchAllJobs(): ",error));

  }
}

export function changeAuthStatus(status){
  return{
    type:ActionTypes.CHANGE_AUTH_STATUS,
    auth:status
  };
}
