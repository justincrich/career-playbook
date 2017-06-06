import * as ActionTypes from '../ActionTypes/auth-actiontypes';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';

//Regester
export const requestRegister=(email,name,password,confirmPassword)=>{
  return{
    type: ActionTypes.REQUEST_REGISTER,
    isFetching:true,
    email:email,
    name:name,
    password:password,
    confirmPassword:confirmPassword
  };
}

export const receiveRegister=(resp)=>{
  if(resp._id){
    return{
      type:ActionTypes.RECEIVE_REGISTER_SUCCESS,
      isFetching:false,
      message: resp.message,
      userId:resp.user_id,
      receivedAt:Date.now()
    };
  }else{
    return{
      type:ActionTypes.RECEIVE_REGISTER_FAILURE,
      isFetching:false,
      message:resp.message,
      receivedAt:Date.now()
    };
  }
}


//Thunk action handlers
export function fetchRegister(email,name,password,confirmPassword){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestRegister(email,name,password,confirmPassword));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.REGISTER;
    var body={
      email:email,
      name:name,
      password:password,
      confirmPassword:confirmPassword
    }
    var init = {
      method:'POST',
      mode:'nocors',
      body:JSON.stringify(body),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveRegister(json))
      ).catch(error=>{
        dispatch(receiveRegister(error));
        console.log("Error: ",error);
      });

  }
}

//Login
export const requestLogin=(email,password)=>{
  return{
    type: ActionTypes.REQUEST_LOGIN,
    isFetching:true,
    email:email
  };
}

export const receiveLogin=(resp)=>{
  var auth = parseInt(resp.auth);
  if(auth==1){
    return{
      type:ActionTypes.RECEIVE_LOGIN_SUCCESS,
      isFetching:false,
      message: resp.message,
      userId:resp.user_id,
      receivedAt:Date.now(),
      auth:auth
    };
  }else if (auth==0){
    return{
      type:ActionTypes.RECEIVE_LOGIN_FAILURE,
      isFetching:false,
      message:resp.message,
      receivedAt:Date.now(),
      auth:auth
    };
  }
}


//Thunk action handlers
export function fetchLogin(_uid,job){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestLogin(_uid,job));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.LOGIN;
    var init = {
      method:'POST',
      mode:'nocors',
      body:JSON.stringify(job),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveLogin(json))
      ).catch(error=>{
        dispatch(receiveLogin({auth:"0"}));
        console.log("Error in Actions.Jobs.fetchJob(): ",error);
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
    auth:parseInt(json.auth),
    receivedAt:Date.now()
  };
}

//Thunk action handlers
export function fetchLogOut(){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestLogout());
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.LOGOUT;
    var init = {method:'GET', mode:'nocors'}
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        // console.log("response",json)
        dispatch(receiveLogout(json))
        // console.log(receiveJob(_jid,json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchAllJobs(): ",error));

  }
}

export function changeAuthStatus(status){
  return{
    type:ActionTypes.CHANGE_AUTH_STATUS,
    auth:status
  };
}
