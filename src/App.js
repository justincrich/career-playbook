import React , {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';
 import Header from './Header';
import Home from './Home';
 import Network from './Network';
import JobsPage from './JobsPage';
import Companies from './Companies';
import NotFound from './NotFound';
import MyModal from './Components/MyModal';
import JobView from './Components/ModalViews/JobView';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getJob, createJob, deleteJob} from './Actions/jobs';

class App extends Component{


  constructor(props){
    super(props);
    this.state ={
      showModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(id){
    console.log(id);
    this.setState(prevState=>({
      showModal:!prevState.showModal
    }));
  }



  render(){
    const {dispatch, jobs, index,_id,job,modalCall}=this.props;
    console.log(jobs, index,_id,job,modalCall);
    const selectJob = bindActionCreators(getJob,dispatch);
    const createJOB = bindActionCreators(createJob,dispatch);
    const deleteJOB = bindActionCreators(deleteJob,dispatch);
    return(
      <div>

              <Header/>

              {/*Modal*/}



                // Routers
              <div  className="App container">

                <BrowserRouter>
                <div className="card">
                  <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                        <NavLink className="nav-link" exact to="/">Activity</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/network">Network</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/companies">Companies</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="card-block">


                        <Switch>
                          <Route exact path="/" component={Home} />
                          <Route  path="/network" component={Network} />
                          <Route  path="/jobs" jobs={this.state.jobs} render={()=><JobsPage selectJob= {selectJob} />}  />
                          <Route  path="/companies" component={Companies} />
                          <Route component={NotFound} />
                        </Switch>


                  </div>
                </div>
                </BrowserRouter>

              </div>
              <JobView />
              <MyModal
                show={this.state.showModal}
                modaltitle="Job Detail"
                modalCall={modalCall}
                data={job}
              />

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
