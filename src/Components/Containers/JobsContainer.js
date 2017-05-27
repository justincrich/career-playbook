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
    this.props.dispatch(Actions.fetchAllJobs());
    this.selectJob.bind(this);
    this.save.bind(this);
    this.closeModal.bind(this);
    this.addJob.bind(this);

  }

  selectJob(id,jobFunc,job){

    jobFunc("591b891e92f23a26c95fd036");
    this.setState({
      selected:"591b891e92f23a26c95fd036"
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

  }

  closeModal(){

    this.setState({
      viewdetails:false
    });
  }

  save(job, updateJob){

    this.setState({
      viewdetails:false
    });
    updateJob(job._id,job)
  }

  search(query, searchJob){

  }

  render(){
    // Redux Setup
    const {dispatch, allJobs, searchResults,job}=this.props;
    const requestJob = bindActionCreators(Actions.fetchJob,dispatch);
    const requestAllJobs = bindActionCreators(Actions.requestAllJobs,dispatch);
    const createJOB = bindActionCreators(Actions.fetchCreateJob,dispatch);
    const deleteJOB = bindActionCreators(Actions.deleteJob,dispatch);
    const updateJOB = bindActionCreators(Actions.updateJob,dispatch);
    const searchJOB = bindActionCreators(Actions.searchJob,dispatch);
    const sendJOB = ()=>job;



    return(

      <div>
        <div className="">
          <JobsGroup jobs={allJobs.records} icon1="business_center" icon2="business"
            selectJob={(id)=>{this.selectJob(id, requestJob.bind(this),job)}}
            onRemove={deleteJOB}
            addJob={createJOB}
            onSearch={searchJOB}
            searchresults={searchResults}
          />

        </div>
         <JobDetailModal job={job.item} viewdetails={this.state.viewdetails} getJob={sendJOB}
           save={(job)=>{this.save(job,updateJOB)}} close={()=>this.closeModal()}/>

      </div>


    );
  }
}

const mapStateToProps= state =>(
    {
      allJobs:state.allJobs,
      searchResults: state.searchResults,
      job:state.job,
    }
);

export default connect(mapStateToProps)(JobsContainer);
