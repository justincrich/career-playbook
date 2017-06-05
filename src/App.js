import React, {Component} from 'react';
import Main from './Components/Pages/Main';
import Desktop from './Components/Pages/Desktop';
import Header from './Components/Views/Header';
import Login from './Components/Views/Login';
import Register from './Components/Views/Register';
import {connect} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as JobActions from './Actions/jobs';
import JobsContainer from './Components/Containers/JobsContainer';
import CompaniesContainer from './Components/Containers/CompaniesContainer';
import reactCSS from 'reactcss';
import '../css/template.css';
const styles = reactCSS({
  'default':{
    header:{
      background:'#ced7db' //Background Blue Grey
    },
    links:{
      color:'#455a64'
    },
  }
});

class App extends Component{

  constructor(props){
    super(props);
    this.state ={
      authenticated:false,

    };
  }

  authenticate(){

  }




  render(){
    // const {dispatch, jobs, index,_id,job,modalCall}=this.props;
    // const selectJob = bindActionCreators(JobActions.getJob,dispatch);
    // const createJOB = bindActionCreators(JobActions.createJob,dispatch);
    // const deleteJOB = bindActionCreators(JobActions.deleteJob,dispatch);
    //()=><Redirect to="/jobs"/>
    return(
      <BrowserRouter>
        <div className="">
          <Header/>
          <Switch>
            <Route exact path="/" render={
              this.state.authenticated ?
              ()=><Redirect to="/jobs"/>
              :
              ()=><Login/>
            }/>
            <Route path="/jobs" component={JobsContainer}/>
            <Route path="/companies" component={CompaniesContainer}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>
      </BrowserRouter>



    );
  }

}

const mapStateToProps= state =>(
  {
    jobs:state.jobs,
    index:state.index,
    _id:state._id,
    job:state.job,
    modalCall:state.modalCall
  }
);


export default connect(mapStateToProps)(App);
