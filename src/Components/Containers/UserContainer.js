import React, {Component} from 'react';
// import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

//CSS
import '../../../css/template.css';
class UserContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      jobs:[],
      selected:0,
      viewdetails:false
    }


  }



  render(){
    // Redux Setup
    // const {dispatch, allJobs, searchResults,job}=this.props;
    // const requestJob = bindActionCreators(Actions.fetchJob,dispatch);
    // const requestAllJobs = bindActionCreators(Actions.requestAllJobs,dispatch);
    // const createJOB = bindActionCreators(Actions.fetchCreateJob,dispatch);
    // const deleteJOB = bindActionCreators(Actions.fetchDeleteJob,dispatch);
    // const updateJOB = bindActionCreators(Actions.fetchUpdateJob,dispatch);
    // const searchJOB = bindActionCreators(Actions.searchJob,dispatch);
    // const sendJOB = ()=>job;



    return(

      <div>


      </div>


    );
  }
}

const mapStateToProps= state =>(
    {

    }
);

export default connect(mapStateToProps)(UserContainer);
