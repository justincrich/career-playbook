import React, {Component} from 'react';
import Main from './Components/Pages/Main';
import Desktop from './Components/Pages/Desktop';
import Header from './Components/Views/Header';
import {connect} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as JobActions from './Actions/jobs';


class App extends Component{

  constructor(props){
    super(props);
    this.state ={
    };
  }



  render(){
    const {dispatch, jobs, index,_id,job,modalCall}=this.props;
    const selectJob = bindActionCreators(JobActions.getJob,dispatch);
    const createJOB = bindActionCreators(JobActions.createJob,dispatch);
    const deleteJOB = bindActionCreators(JobActions.deleteJob,dispatch);
    return(

        <div >

          <BrowserRouter>
            <div>
              <Header/>
              <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/Desktop" component={Desktop}/>
              </Switch>

            </div>

          </BrowserRouter>

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
    modalCall:state.modalCall
  }
);


export default connect(mapStateToProps)(App);
