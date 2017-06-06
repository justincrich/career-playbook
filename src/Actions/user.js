import * as ActionTypes from '../ActionTypes/user-actiontypes';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';


//GET ONE USER
export const requestUser=(_id)=>{
  return{
    type: ActionTypes.REQUEST_USER,
    isFetching:true,
    _id
  };
}

export const receiveUser=(_id,json)=>{
  return{
    type:ActionTypes.RECEIVE_USER_SUCCESS,
    isFetching:false,
    _id,
    user: json,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchUser(_id){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUser(_id));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USERS.concat(_id);
    var init = {method:'GET', mode:'nocors'}
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveUser(_id,json))
        // console.log(receiveUser(_id,json))
      ).catch(error=>console.log("Error in Actions.Users.fetchUser(): ",error));

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
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER.concat(user._id);
    var init = {
      method:'PUT',
      mode:'nocors',
      body:JSON.stringify(user),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveUpdateUser(json))
      ).catch(error=>console.log("Error in Actions.Users.fetchUser(): ",error));

  }
}
