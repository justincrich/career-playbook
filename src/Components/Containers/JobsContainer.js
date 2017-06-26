import React, {Component} from 'react';
import JobsGroup from '../Views/JobsGroup';
// import {Route} from 'react-router-dom';
import store from '../../Store/store';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions/jobs';
import JobDetailModal from '../ModalViews/JobDetailModal';
import JobModalView from '../ModalViews/JobModalView';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

// STYLING
import '../../../css/template.css';
import Radium from 'radium';
import * as Template from '../../Styles/template';

class JobsContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      jobs:[],
      selected:0,
      viewdetails:false
    }

    this.selectJob.bind(this);
    this.saveUpdate.bind(this);
    this.closeModal.bind(this);

  }

  componentWillMount(){
    var state = store.getState();
    var user = state.userState.user;
    store.dispatch(Actions.fetchAllJobs(user._id));
  }

  selectJob(id,jobFunc,user){

    jobFunc(user._id,id);
    this.setState(prevState => ({
      viewdetails: !prevState.viewdetails
    }));
    //this.props.OpenModal(id);
  }


  closeModal(){

    this.setState({
      viewdetails:false
    });
  }

  saveUpdate(job, updateJob,uid){

    this.setState({
      viewdetails:false
    });
    updateJob(uid,job);
  }

  search(query, searchJob){

  }

  render(){
    // Redux Setup
    const {dispatch, allJobs, searchResults,job,user}=this.props;
    const requestJob = bindActionCreators(Actions.fetchJob,dispatch);
    const requestAllJobs = bindActionCreators(Actions.requestAllJobs,dispatch);
    const createJOB = bindActionCreators(Actions.fetchCreateJob,dispatch);
    const deleteJOB = bindActionCreators(Actions.fetchDeleteJob,dispatch);
    const updateJOB = bindActionCreators(Actions.fetchUpdateJob,dispatch);
    const searchJOB = bindActionCreators(Actions.searchJob,dispatch);
    const sendJOB = ()=>job;



    return(

      <div >
        <div >
          <JobsGroup jobs={allJobs.records} icon1="business_center" icon2="business"
            selectJob={(id)=>{
              this.selectJob(id, requestJob.bind(this),user);
            }}
            onRemove={(_jid)=>deleteJOB(user._id,_jid)}
            addJob={(job)=>{
              job.uID=user._id;
              createJOB(user._id,job);
            }}
            onSearch={searchJOB}
            searchresults={searchResults}
            updateJob={(job)=>{
              job.uID = user._id;
              updateJOB(user._id,job);
            }}
          />

        </div>
         <JobDetailModal job={job.item} viewdetails={this.state.viewdetails}
           save={(job)=>{
             job.uID = user._id;
             this.saveUpdate(job,updateJOB.bind(this),user._id);
           }} close={()=>this.closeModal()}/>

      </div>


    );
  }
}

const mapStateToProps= state =>(
    {
      allJobs:state.jobsState.allJobs,
      searchResults: state.jobsState.searchResults,
      job:state.jobsState.job,
      user:state.userState.user
    }
);

export default connect(mapStateToProps)(JobsContainer);
