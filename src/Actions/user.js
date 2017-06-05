import * as ActionTypes from '../ActionTypes/jobs-actiontypes';
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
    job: json,
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
    var url = (useSSL ? 'https://':'http://')+Endpoints.USERS.concat(_id);
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








//CREATE JOB

export const requestCreateUser=(job)=>{
  return{
    type: ActionTypes.REQUEST_CREATE_USER,
    isFetching:true,
    job:job
  };
}

export const receiveCreateUser=(job)=>{
  return{
    type:ActionTypes.RECEIVE_CREATE_USER_SUCCESS,
    isFetching:false,
    job: job,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchCreateUser(job){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestCreateUser(job));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS;
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
        dispatch(receiveCreateUser(json))
      ).catch(error=>console.log("Error in Actions.Users.fetchUser(): ",error));

  }
}



//DELETE JOB
export const requestDeleteUser=(_id)=>{
  return{
    type: ActionTypes.REQUEST_DELETE_USER,
    isFetching:true,
    _id:_id
  };
}

export const receiveDeleteUser=(jobsRemaining)=>{
  return{
    type:ActionTypes.RECEIVE_DELETE_USER_SUCCESS,
    isFetching:false,
    jobsRemaining: jobsRemaining,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchDeleteUser(_id){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestDeleteUser(_id));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS.concat(_id);
    var init = {
      method:'DELETE',
      mode:'nocors',
      // body:JSON.stringify(job),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveDeleteUser(json))
        // console.log("RESPONSE DELETE",json)
      ).catch(error=>console.log("Error in Actions.Users.fetchUser(): ",error));

  }
}
// UPDATE JOB FUNCTION
export const requestUpdateUser=(job)=>{
  return{
    type: ActionTypes.REQUEST_UPDATE_USER,
    isFetching:true,
    job:job
  };
}

export const receiveUpdateUser=(job)=>{
  return{
    type:ActionTypes.RECEIVE_UPDATE_USER_SUCCESS,
    isFetching:false,
    job: job,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchUpdateUser(job){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUpdateUser(job));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS.concat(job._id);
    var init = {
      method:'PUT',
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
        dispatch(receiveUpdateUser(json))
      ).catch(error=>console.log("Error in Actions.Users.fetchUser(): ",error));

  }
}



export const searchUser = (query)=>{
  return{
    type:ActionTypes.SEARCH_USER,
    query
  };
}
