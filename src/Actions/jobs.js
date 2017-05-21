import {GET_JOB, CREATE_JOB,DELETE_JOB} from '../ActionTypes/jobs';



export const getJob = (index,_id) =>{
  return{
    type:GET_JOB,
    index,
    _id
  };
};

export const createJob = (_id,title,company) =>{
  return{
    type:CREATE_JOB,
    _id,
    title,
    company
  };
};

export const deleteJob = (_id) =>{
  return{
    type:DELETE_JOB,
    _id
  };
};
