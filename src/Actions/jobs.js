import * as ActionTypes from '../ActionTypes/jobs-actiontypes';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';

//GET ALL JOBS
export const requestAllJobs=()=>{

  return{
    type: ActionTypes.REQUEST_ALL_JOBS,
    isFetching:true
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
export function fetchAllJobs(){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestAllJobs());
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS;
    var init = {method:'GET', mode:'cors'}
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveAllJobs(json))
        // console.log(receiveJob(_id,json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchAllJobs(): ",error));

  }
}

//GET ONE JOB
export const requestJob=(_id)=>{
  return{
    type: ActionTypes.REQUEST_JOB,
    isFetching:true,
    _id
  };
}

export const receiveJob=(_id,json)=>{
  return{
    type:ActionTypes.RECEIVE_JOB_SUCCESS,
    isFetching:false,
    _id,
    job: json,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchJob(_id){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestJob(_id));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS.concat(_id);
    console.log(url);
    var init = {method:'GET', mode:'cors'}
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveJob(_id,json))
        // console.log(receiveJob(_id,json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}








//CREATE JOB

export const requestCreateJob=(job)=>{
  return{
    type: ActionTypes.REQUEST_CREATE_JOB,
    isFetching:true,
    job:job
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
export function fetchCreateJob(job){
  console.log("CREATE JOB",job);
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestCreateJob(job));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS;
    var init = {
      method:'POST',
      mode:'cors',
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
        dispatch(receiveCreateJob(json))
      ).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}



//DELETE JOB
export const requestDeleteJob=(_id)=>{
  return{
    type: ActionTypes.REQUEST_DELETE_JOB,
    isFetching:true,
    _id:_id
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
export function fetchDeleteJob(_id){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestDeleteJob(_id));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS.concat(_id);
    var init = {
      method:'DELETE',
      mode:'cors',
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
        dispatch(receiveDeleteJob(json))
        // console.log("RESPONSE DELETE",json)
      ).catch(error=>console.log("Error in Actions.Jobs.fetchJob(): ",error));

  }
}
// UPDATE JOB FUNCTION
export const requestUpdateJob=(job)=>{
  return{
    type: ActionTypes.REQUEST_UPDATE_JOB,
    isFetching:true,
    job:job
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
export function fetchUpdateJob(job){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUpdateJob(job));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.JOBS.concat(job._id);
    var init = {
      method:'PUT',
      mode:'cors',
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
