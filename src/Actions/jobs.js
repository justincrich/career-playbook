import * as ActionTypes from '../ActionTypes/jobs-actiontypes';


//Action types to get a job
export const getJob = (_id) =>{
  return{
    type:ActionTypes.GET_JOB,
    _id
  };
};

export const requestJob=(_id)=>{
  return{
    type: ActionTypes.REQUEST_JOB,
    _id
  };
}

export const receiveJob=(_id,json)=>{
  return{
    type:ActionTypes.REQUEST_JOB_SUCCESS,
    _id,
    job: json,
    receivedAt:Date.now()
  };
}


//Action types to create a job
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
