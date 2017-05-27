import * as JobsActionTypes from '../ActionTypes/jobs-actiontypes';
import { combineReducers } from 'redux';
import Fuse from 'fuse.js';

const initialState = {
  allJobs:{
    isFetching:false,
    reqestID:-1,
    lastUpdated:-1,
    records:[
      // {
      //     _id:1,
      //     title:"Engineer",
      //     companyName:"Google",
      //     companyID:123,
      //     url:"google.com",
      //     notes:"aaa"
      // }
    ]
  },
  searchResults:[

  ],
  job:{
      isFetching:false,
      reqestID:-1,
      lastUpdated:-1,
      item:{
        // _id:-1,
        // title:"blank",
        // companyName:"blank",
        // companyID:-1,
        // url:"blank",
        // notes:"blank"
      }
  }

};




function JobsReducer(state=initialState,action){

  switch(action.type){
    // REQUEST ONE JOB
    case JobsActionTypes.REQUEST_JOB:{
      var reqJob={
        isFetching:action.isFetching,
        reqestID:action._id,
        lastUpdated:state.job.lastUpdated,
        item:state.job.item
      }
        return {
          ...state,job:reqJob
        }
    }
    case JobsActionTypes.RECEIVE_JOB_SUCCESS:{

      var receiveJob={
        isFetching:action.isFetching,
        reqestID:action._id,
        lastUpdated:action.receivedAt,
        item:action.job
      }
        return {
          ...state,job:receiveJob
        }
    }
    // GET ALL JOBS
    case JobsActionTypes.REQUEST_ALL_JOBS:{
      var reqAllJobs={
        isFetching:action.isFetching,
        lastUpdated:state.allJobs.lastUpdated,
        records:state.allJobs.records
      }
        return {
          ...state,allJobs:reqAllJobs
        }
    }
    case JobsActionTypes.RECEIVE_ALL_JOBS_SUCCESS:{

      var resAllJobs={
        isFetching:action.isFetching,
        lastUpdated:action.receivedAt,
        records:action.allJobs,
        receivedAt:action.receivedAt
      }
        return {
          ...state,allJobs:resAllJobs
        }
    }
    // SEARCH CURRENT LIST OF JOBS
    case JobsActionTypes.SEARCH_JOB:{
      var options={
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys:[
          "title",
          "companyName"
        ]
      };

      var fuse = new Fuse(state.allJobs.records,options);

      state.searchResults=fuse.search(action.query);
      return{
        ...state
      };
    }
    // CREATE JOB
    case JobsActionTypes.REQUEST_CREATE_JOB:{
      var reqJob={
        isFetching:action.isFetching,
        reqestID:0,
        lastUpdated:0,
        item:action.job
      }
        return {
          ...state,job:reqJob
        }
    }
    case JobsActionTypes.RECEIVE_CREATE_JOB_SUCCESS:{

      var receiveJob={
        isFetching:action.isFetching,
        reqestID:action.job._id,
        lastUpdated:action.receivedAt,
        item:action.job
      }
      var arr = state.allJobs.records;
      arr.push(action.job);

      return {
        ...state,job:receiveJob,allJobs:{
          isFetching:false,
          reqestID:-1,
          lastUpdated:action.receivedAt,
          records:arr
        }
      }
    }
    // UPDATE JOB
    case JobsActionTypes.REQUEST_UPDATE_JOB:{
      var reqJob={
        isFetching:action.isFetching,
        reqestID:action.job._id,
        lastUpdated:0,
        item:action.job
      }
        return {
          ...state,job:reqJob
        }
    }
    case JobsActionTypes.RECEIVE_UPDATE_JOB_SUCCESS:{
      var receiveJob={
        isFetching:action.isFetching,
        reqestID:action.job._id,
        lastUpdated:action.receivedAt,
        item:action.job
      }
      var arr = state.allJobs.records;
          for(var i = 0; i<arr.length;i++){
            if(arr[i]._id===action.job._id){
              arr = [...arr.slice(0,i),action.job,...arr.slice(i+1)];
            }
          }
        var listUpdate = {
          isFetching:false,
          reqestID:-1,
          lastUpdated:action.receivedAt,
          records:arr
        };

      return {
        ...state,job:receiveJob,allJobs:listUpdate
      }
    }
    case JobsActionTypes.REQUEST_DELETE_JOB:{
      var reqJob={
        isFetching:action.isFetching,
        reqestID:action._id,
        lastUpdated:0,
        item:{}
      }
        return {
          ...state,job:reqJob
        }
    }
    case JobsActionTypes.RECEIVE_DELETE_JOB_SUCCESS:{
      var receiveJob={
        isFetching:action.isFetching,
        reqestID:state.job.requestID,
        lastUpdated:action.receivedAt,
      }

      return {
        ...state,job:receiveJob,allJobs:{
          isFetching:false,
          reqestID:-1,
          lastUpdated:action.receivedAt,
          records:action.jobsRemaining
        }
      }
    }
    default:
      return state;
  }


}

export default JobsReducer;
