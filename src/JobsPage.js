import React, {Component} from 'react';
import ItemGroup from './Components/ItemGroup';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getJob,createJob,deleteJob} from './Actions/jobs';


class JobsPage extends Component{
  constructor(props){
    super(props);
    this.state={
      jobs:[]
    }


  }



  selectJob(id){
    console.log(id);
    this.props.selectJob(id);
    //this.props.OpenModal(id);
  }

  removeJob(){
    //this.state.history.push(`jobs/${teacherTopic}/${teacherName}`);
    //console.log(this.state.history);
  }


  render(){
    const {dispatch, jobs, index,job,_id}=this.props;
    const selectJob = bindActionCreators(getJob,dispatch);
    const createJOB = bindActionCreators(createJob,dispatch);
    const deleteJOB = bindActionCreators(deleteJob,dispatch);
    return(
      <div className="">
        <ItemGroup jobs={jobs} icon1="business_center" icon2="business"
          selectJob={(id)=>this.selectJob(id)}
          onRemove={deleteJOB}/>


      </div>

    );
  }
}

const mapStateToProps= state =>(
    {
      jobs:state.jobs,
      index:state.index,
      _id:state._id,
      job:state.job
    }
);

export default connect(mapStateToProps)(JobsPage);
