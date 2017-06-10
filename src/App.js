import React, {Component} from 'react';
import Header from './Components/Views/Header';
import Login from './Components/Views/Login';
import Register from './Components/Views/Register';
import Unauthorized from './Components/Views/Unauthorized';
import {connect} from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as AuthActions from './Actions/auth';
import AuthContainer from './Components/Containers/AuthContainer';
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





  render(){
    const {dispatch, isFetching,auth,error}=this.props;
    const changeAuthStatus = bindActionCreators(AuthActions.changeAuthStatus,dispatch);
    const fetchLogOut = bindActionCreators(AuthActions.fetchLogOut,dispatch);
    return(
      <BrowserRouter>
        <div className="">
          <Header auth={auth} logout={fetchLogOut} />

          <Switch>
            <Route exact path="/" render={
              auth == 1 ?
              ()=><Redirect to="/jobs"/>
              :
              ()=><AuthContainer login={true} register={false}/>
            }/>

            <Route path="/jobs" component={
              auth==1?
              JobsContainer
              :
              Unauthorized
            }/>
            <Route path="/companies" component={
              auth==1?
              CompaniesContainer
              :
              Unauthorized
            }/>
            <Route path="/login" component={
              auth==1?
              JobsContainer
              :
              Login
            }/>
            <Route path="/register" component={
              auth==1?
              JobsContainer
              :
              Register
            }/>
          </Switch>
        </div>
      </BrowserRouter>



    );
  }

}

const mapStateToProps= state =>(
  {
    isFetching:state.authState.isFetching,
    message:state.authState.message,
    auth:state.authState.auth,
    error:state.authState.error
  }
);


export default connect(mapStateToProps)(App);
