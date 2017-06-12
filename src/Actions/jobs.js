import * as ActionTypes from '../ActionTypes/jobs-actiontypes';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';

//GET ALL JOBS
export const requestAllJobs=(_uid)=>{

  return{
    type: ActionTypes.REQUEST_ALL_JOBS,
    isFetching:true,
    userId:_uid
  };
}

export const receiveAllJobs=(json)=>{
  return{
    type:ActionTypes.RECEIVE_ALL_JOBS_SUCCESS,
    isFetching:false,
    allJobs: json,
    receivedAt:Date.now()
  };
}

//Thunk action handlers
export function fetchAllJobs(_uid){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestAllJobs(_uid));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.JOBS;
    var init = {method:'GET', mode:'same-origin',credentials:'same-origin'}
    var req = new Request(Endpoints.USER+_uid+Endpoints.JOBS,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        // console.log("response",json)
        dispatch(receiveAllJobs(json))
        // console.log(receiveJob(_jid,json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchAllJobs(): ",error));

  }
}

//GET ONE JOB
export const requestJob=(_uid,_jid)=>{
  return{
    type: ActionTypes.REQUEST_JOB,
    isFetching:true,
    _jid,
    userId:_uid
  };
}

export const receiveJob=(_jid,json)=>{
  return{
    type:ActionTypes.RECEIVE_JOB_SUCCESS,
    isFetching:false,
    _jid,
    job: json,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchJob(_uid,_jid){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestJob(_uid,_jid));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.JOBS.concat(_jid);
    var init = {method:'GET', mode:'same-origin',credentials:'same-origin'}
    var req = new Request(Endpoints.USER+_uid+Endpoints.JOBS+_jid,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveJob(_jid,json))
        // console.log(receiveJob(_jid,json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}








//CREATE JOB

export const requestCreateJob=(_uid,job)=>{
  return{
    type: ActionTypes.REQUEST_CREATE_JOB,
    isFetching:true,
    job:job,
    userId:_uid
  };
}

export const receiveCreateJob=(job)=>{
  return{
    type:ActionTypes.RECEIVE_CREATE_JOB_SUCCESS,
    isFetching:false,
    job: job,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchCreateJob(_uid,job){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestCreateJob(_uid,job));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.JOBS;
    var init = {
      method:'POST',
      mode:'same-origin',
      credentials:'same-origin',
      body:JSON.stringify(job),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    console.log("URL",Endpoints.USER+_uid+Endpoints.JOBS);
    var req = new Request(Endpoints.USER+_uid+Endpoints.JOBS,init);

    return fetch(req)
      .then(response=>{
        if(response.ok){
          response.json().then(json=>{
            dispatch(receiveCreateJob(json));
          });
        }
      }).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}



//DELETE JOB
export const requestDeleteJob=(_uid,_jid)=>{
  return{
    type: ActionTypes.REQUEST_DELETE_JOB,
    isFetching:true,
    _id:_jid,
    userId:_uid
  };
}

export const receiveDeleteJob=(jobsRemaining)=>{
  return{
    type:ActionTypes.RECEIVE_DELETE_JOB_SUCCESS,
    isFetching:false,
    jobsRemaining: jobsRemaining,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchDeleteJob(_uid,_jid){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestDeleteJob(_uid,_jid));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.JOBS.concat(_jid);
    var init = {
      method:'DELETE',
      mode:'same-origin',
      credentials:'same-origin',
      // body:JSON.stringify(job),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(Endpoints.USER+_uid+Endpoints.JOBS+_jid,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveDeleteJob(json))
        // console.log("RESPONSE DELETE",json)
      ).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}
// UPDATE JOB FUNCTION
export const requestUpdateJob=(_uid,job)=>{
  return{
    type: ActionTypes.REQUEST_UPDATE_JOB,
    isFetching:true,
    job:job,
    userId:_uid
  };
}

export const receiveUpdateJob=(job)=>{
  return{
    type:ActionTypes.RECEIVE_UPDATE_JOB_SUCCESS,
    isFetching:false,
    job: job,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchUpdateJob(_uid,job){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUpdateJob(_uid,job));
    //Get job
    // var useSSL = 'https:' === document.location.protocol;
    // var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.JOBS.concat(job._id);
    var init = {
      method:'PUT',
      mode:'same-origin',
      credentials:'same-origin',
      body:JSON.stringify(job),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(Endpoints.USER+_uid+Endpoints.JOBS+job._jid,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveUpdateJob(json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}



export const searchJob = (query)=>{
  return{
    type:ActionTypes.SEARCH_JOB,
    query
  };
}
