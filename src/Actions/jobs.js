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
    jobs: json,
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
export const createJob = (job) =>{
  return{
    type:ActionTypes.CREATE_JOB,
    job
  };
};

export const updateJob = (_id,job) =>{
  return{
    type:ActionTypes.UPDATE_JOB,
    job
  };
};

export const deleteJob = (_id) =>{
  return{
    type:ActionTypes.DELETE_JOB,
    _id
  };
};

export const searchJob = (query)=>{
  return{
    type:ActionTypes.SEARCH_JOB,
    query
  };
}
