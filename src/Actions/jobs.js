import * as ActionTypes from '../ActionTypes/jobs-actiontypes';


export const getJob = (_id) =>{
  return{
    type:ActionTypes.GET_JOB,
    _id
  };
};

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
