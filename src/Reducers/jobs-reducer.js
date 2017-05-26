import * as JobsActionTypes from '../ActionTypes/jobs-actiontypes';
import Fuse from 'fuse.js';

const initialState = {
  jobs:[
    {
        _id:1,
        title:"Engineer",
        companyName:"Google",
        companyID:123,
        url:"google.com",
        notes:"aaa"
      },
      {
        _id:2,
        title:"Engineer",
        companyName:"Facebook",
        companyID:234,
        url:"facebook.com",
        notes:"bbb"
      },
      {
        _id:3,
        title:"Engineer",
        companyName:"Snapchat",
        companyID:143,
        url:"snapchat.com",
        notes:"ccc"
      }
  ],
  searchResults:[

  ],
  index:-1,
  _id:-1,
  job:{
    _id:-1,
    title:"blank",
    companyName:"blank",
    companyID:-1,
    url:"blank",
    notes:"blank"
  }

};




export default function JobsReducer(state=initialState,action){

  switch(action.type){
    case JobsActionTypes.GET_JOB:{
      var job = state.job;
        var arr = state.jobs;

        for(var i = 0; i<arr.length;i++){
          if(arr[i]._id===action._id){
            job = arr[i];
          }
        }
      return{
				...state,
				index: action.index,
        currentID:action._id,
        job:job,
        modalCall:JobsActionTypes.GET_JOB
			};
    }
    case JobsActionTypes.SEARCH_JOB:{
      console.log("Result length",state.searchResults.length);
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

      var fuse = new Fuse(state.jobs,options);

      console.log("SEARCH QUERY: ",action.query," Results ", fuse.search(action.query));
      state.searchResults=fuse.search(action.query);
      return{
        ...state
      };
    }
    case JobsActionTypes.CREATE_JOB:{
      state.jobs.push(action.job);
      return {
        ...state
      };
    }
    case JobsActionTypes.UPDATE_JOB:{

        for(var i = 0; i<state.jobs.length;i++){
          if(state.jobs[i]._id===action.job._id){
            state.jobs = [...state.jobs.slice(0,i),action.job,...state.jobs.slice(i+1)];
          }
        }
      return {
        ...state
      }
    }
    case JobsActionTypes.DELETE_JOB:{
        var id = action._id;
        for(var i = 0; i<state.jobs.length;i++){
          if(state.jobs[i]._id===action._id){
            state.jobs = [...state.jobs.slice(0,i),...state.jobs.slice(i+1)];

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



// getAllJobs(){
//
//   axios.get('http://localhost:3030/jobs/')
//   .then(response => {
//     this.setState({
//       jobs: response.data,
//     });
//
//   })
//   .catch(error => {
//     //console.log('Error fetching and parsing data', error);
//   });
// }
