import {GET_JOB, CREATE_JOB,DELETE_JOB} from '../ActionTypes/jobs';



export const getJob = (_id) =>{
  return{
    type:GET_JOB,
    _id
  };
};

export const createJob = (_id,title,companyName,companyID,url,notes) =>{
  return{
    type:CREATE_JOB,
    _id,
    title,
    companyName,
    companyID,
    url,
    notes
  };
};


export const deleteJob = (_id) =>{
  return{
    type:DELETE_JOB,
    _id
  };
};
