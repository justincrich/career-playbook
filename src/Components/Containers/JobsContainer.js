import React, {Component} from 'react';
import JobsGroup from '../Views/JobsGroup';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions/jobs';
import JobDetailModal from '../ModalViews/JobDetailModal';
import JobModalView from '../ModalViews/JobModalView';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

//CSS
import '../../../css/template.css';
class JobsContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      jobs:[],
      selected:0,
      viewdetails:false
    }
    this.selectJob.bind(this);
    this.save.bind(this);
    this.closeModal.bind(this);
    this.addJob.bind(this);

  }

  selectJob(id,jobFunc){
    // console.log("JOB",this.job);
    jobFunc(id);
    this.setState({
      selected:id
    });
    this.setState(prevState => ({
      viewdetails: !prevState.viewdetails
    }));
    //this.props.OpenModal(id);
  }

  removeJob(){
    //this.state.history.push(`jobs/${teacherTopic}/${teacherName}`);
    //console.log(this.state.history);
  }

  addJob(){
    console.log("ADD JOB");
  }

  closeModal(){
    console.log("CLOSE TEST");
    this.setState({
      viewdetails:false
    });
  }

  save(job, updateJob){
    console.log("Saving job in container",job);
    this.setState({
      viewdetails:false
    });
    updateJob(job._id,job)
  }

  render(){
    // Redux Setup
    const {dispatch, jobs, index,job,_id}=this.props;
    const selectJOB = bindActionCreators(Actions.getJob,dispatch);
    const createJOB = bindActionCreators(Actions.createJob,dispatch);
    const deleteJOB = bindActionCreators(Actions.deleteJob,dispatch);
    const updateJOB = bindActionCreators(Actions.updateJob,dispatch);
    const sendJOB = ()=>job;

    return(

      <div>
        <div className="">
          <JobsGroup jobs={jobs} icon1="business_center" icon2="business"
            selectJob={(id)=>{this.selectJob(id, selectJOB.bind(this),job)}}
            onRemove={deleteJOB}
            addJob={createJOB}/>

        </div>
         <JobDetailModal job={job} viewdetails={this.state.viewdetails} getJob={sendJOB}
           save={(job)=>{this.save(job,updateJOB)}} close={()=>this.closeModal()}/>

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
