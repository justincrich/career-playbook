import * as JobsActionTypes from '../ActionTypes/jobs-actiontypes';


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
    case JobsActionTypes.CREATE_JOB:{
      state.jobs.push({_id:action._id,tile:action.title,company:action.company});
      return {
        ...state,
        job: {
          _id:action._id,
          tile:action.title,
          companyName:action.companyName,
          companyID:action.companyID,
          url:action.url,
          notes:action.notes
        },
        currendID:action._id
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
