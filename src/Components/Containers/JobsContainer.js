import React, {Component} from 'react';
import JobsGroup from '../Views/JobsGroup';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions/jobs';
import JobModal from '../Views/JobModal';
import JobModalView from '../ModalViews/JobModalView';

class JobsContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      jobs:[],
      selected:0,
      editmode:false
    }
    this.selectJob.bind(this);

  }

  selectJob(id){
    this.setState({
      selected:id
    });
    this.setState(prevState => ({
      editmode: !prevState.editmode
    }));
    //this.props.OpenModal(id);
    console.log(this.state.editmode);
  }

  removeJob(){
    //this.state.history.push(`jobs/${teacherTopic}/${teacherName}`);
    //console.log(this.state.history);
  }

  toggle(){
    // this.setState(prevState => ({
    //   editmode1: !prevState.editmode1
    // }));
    console.log("toggle");
  }
  save(){
    console.log("save");

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
          <JobsGroup jobs={jobs} icon1="business_center" icon2="business"
            selectJob={(id)=>this.selectJob(id)}
            onRemove={deleteJOB}/>

        </div>
        {this.state.editmode && <JobModal/>}
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
