import * as ActionTypes from '../ActionTypes/user-actiontypes';
import * as AuthActions from './auth';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';


//GET ONE USER
export const requestUser=()=>{
  return{
    type: ActionTypes.REQUEST_USER,
    isFetching:true
  };
}

export const receiveUserSuccess=(user)=>{
  return{
    type:ActionTypes.RECEIVE_USER_SUCCESS,
    isFetching:false,
    user: user,
    receivedAt:Date.now()
  };
}
export const receiveUserFailure=()=>{
  return{
    type:ActionTypes.RECEIVE_USER_FAILURE,
    receivedAt:Date.now(),
    message:"Please Log In Again",
    isFetching:false,
    user:undefined
  };
}




//Thunk action handlers
export function fetchUser(){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUser());
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER;
    var init = {method:'GET',mode:'same-origin',credentials:'include'};

    var req = new Request(Endpoints.USER,init);
    return fetch(req)
      .then(response=>{
        if(response.ok){
          response.json().then(json=>{
            // console.log("USER RESP SUCC:",json);
            dispatch(receiveUserSuccess(json));
          });
        }
        if(response.status == 401){
          console.log("USER RESP FAILURE:",response.status);
          dispatch(receiveUserFailure());
        }
        if(response.status == 500){
          var err = new Error('Cannot load user, contact the systems admin.');
        }

      }).catch(error=>dispatch(receiveUserFailure(error.message)));

  }
}


// UPDATE JOB FUNCTION
export const requestUpdateUser=(user)=>{
  return{
    type: ActionTypes.REQUEST_UPDATE_USER,
    isFetching:true,
    user:user
  };
}

export const receiveUpdateUser=(user)=>{
  return{
    type:ActionTypes.RECEIVE_UPDATE_USER_SUCCESS,
    isFetching:false,
    user: user,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchUpdateUser(user){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUpdateUser(user));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER.concat(user._id);
    var init = {
      method:'PUT',
      mode:'same-origin',
      credentials:'same-origin',
      body:JSON.stringify(user),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
         Accept: 'application/json',
        'Data-Type':'json'
      })

    }
    var req = new Request(Endpoints.USER,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveUpdateUser(json))
      ).catch(error=>console.log("Error in Actions.Users.fetchUser(): ",error));

  }
}
