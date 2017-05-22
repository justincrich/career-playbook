import React, {Component} from 'react';
import ItemGroup from '../Views/ItemGroup';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions/jobs';
import MyModal from '../Views/MyModal';


class JobsContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      jobs:[]
    }


  }

  selectJob(id){
    console.log("JOB SELECTED",id);

    //this.props.OpenModal(id);
  }

  removeJob(){
    //this.state.history.push(`jobs/${teacherTopic}/${teacherName}`);
    //console.log(this.state.history);
  }

  render(){
    // Redux Setup
    const {dispatch, jobs, index,job,_id}=this.props;
    const selectJob = bindActionCreators(Actions.getJob,dispatch);
    const createJOB = bindActionCreators(Actions.createJob,dispatch);
    const deleteJOB = bindActionCreators(Actions.deleteJob,dispatch);
    return(

      <div>
        <div className="">
          <ItemGroup jobs={jobs} icon1="business_center" icon2="business"
            selectJob={(id)=>this.selectJob(id)}
            onRemove={deleteJOB}/>

            <MyModal/>
        </div>
      </div>


    );
  }
}

const mapStateToProps= state =>(
    {
      jobs:state.jobs,
      index:state.index,
      _id:state._id,
      job:state.job,
    }
);

export default connect(mapStateToProps)(JobsContainer);
