import React, {Component} from 'react';
import Main from './Components/Pages/Main';
import Desktop from './Components/Pages/Desktop';
import Header from './Components/Views/Header';
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


class App extends Component{

  constructor(props){
    super(props);
    this.state ={
    };
  }



  render(){
    // const {dispatch, jobs, index,_id,job,modalCall}=this.props;
    // const selectJob = bindActionCreators(JobActions.getJob,dispatch);
    // const createJOB = bindActionCreators(JobActions.createJob,dispatch);
    // const deleteJOB = bindActionCreators(JobActions.deleteJob,dispatch);
    return(
      <BrowserRouter>
        <div>
          <Header/>
          <div className="container App">

            <div className="card my-3">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/companies">Companies</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/network">Network</NavLink>
                  </li>
                </ul>
              </div>
              <div className="card-block">

                  <div>
                    <Switch>
                      <Route exact path="/" render={()=><Redirect to="/jobs"/>}/>
                      <Route path="/jobs" component={JobsContainer}/>
                      <Route path="/companies" component={CompaniesContainer}/>
                    </Switch>

                  </div>


              </div>
            </div>

          </div>
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
