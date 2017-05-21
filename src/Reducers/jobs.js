import  {GET_JOB, CREATE_JOB,DELETE_JOB} from '../ActionTypes/jobs';
import axios from 'axios';

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
  job:{}

};



export default function JobReducer(state=initialState,action){

  switch(action.type){
    case GET_JOB:{
      var job = null;
        var arr = initialState.jobs;

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
        modalCall:GET_JOB
			};
    }
    case CREATE_JOB:{
      initialState.jobs.push({_id:action._id,tile:action.title,company:action.company});
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
    case DELETE_JOB:{
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
