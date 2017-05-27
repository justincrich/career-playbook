import * as JobsActionTypes from '../ActionTypes/jobs-actiontypes';
import { combineReducers } from 'redux';
import Fuse from 'fuse.js';

const initialState = {
  allJobs:{
    isFetching:false,
    reqestID:-1,
    lastUpdated:-1,
    records:[
      {
          _id:1,
          title:"Engineer",
          companyName:"Google",
          companyID:123,
          url:"google.com",
          notes:"aaa"
        }
    ]
  },
  searchResults:[

  ],
  job:{
      isFetching:false,
      reqestID:-1,
      lastUpdated:-1,
      item:{
        _id:-1,
        title:"blank",
        companyName:"blank",
        companyID:-1,
        url:"blank",
        notes:"blank"
      }
  }

};




function JobsReducer(state=initialState,action){

  switch(action.type){
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

      var fuse = new Fuse(state.allJobs,options);

      state.searchResults=fuse.search(action.query);
      return{
        ...state
      };
    }
    case JobsActionTypes.CREATE_JOB:{
      state.allJobs.push(action.job);
      return {
        ...state
      };
    }
    case JobsActionTypes.UPDATE_JOB:{

        for(var i = 0; i<state.allJobs.length;i++){
          if(state.allJobs[i]._id===action.job._id){
            state.allJobs = [...state.allJobs.slice(0,i),action.job,...state.allJobs.slice(i+1)];
          }
        }
      return {
        ...state
      }
    }
    case JobsActionTypes.DELETE_JOB:{
        var id = action._id;
        for(var i = 0; i<state.allJobs.length;i++){
          if(state.allJobs[i]._id===action._id){
            state.allJobs = [...state.allJobs.slice(0,i),...state.allJobs.slice(i+1)];

          }
        }
      return {
        ...state,
      };
    }
    default:
      return state;
  }


}

// //Handles all actions to the Jobs API
// function ServicesJobsReducer (state = initialState,action){
//   switch(action.type){
//     case JobsActionTypes.REQUEST_JOB:
//       return Object.assign({},state,{job:{
//           isFetching:action.isFetching,
//           reqestID:action._id
//         }
//       }
//     );
//     case JobsActionTypes.RECEIVE_JOB:
//       return Object.assign({},state,{job:{
//         isFetching:action.isFetching,
//         item:action.job,
//         lastUpdated:action.receivedAt
//       }});
//     default:
//       return state
//   }
// }

// const JobsReducer = combineReducers({
//   FrontendJobsReducer,
//   ServicesJobsReducer
// });

export default JobsReducer;
