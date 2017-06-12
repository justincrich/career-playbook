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
import * as UserActions from './Actions/user';
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

    };
    props.dispatch(UserActions.fetchUser());
  }







  render(){
    const {dispatch, isFetching,message,user,error}=this.props;
    const changeAuthStatus = bindActionCreators(AuthActions.changeAuthStatus,dispatch);
    const fetchLogOut = bindActionCreators(AuthActions.fetchLogOut,dispatch);
    const fetchUser = bindActionCreators(UserActions.fetchUser,dispatch);
    return(

          <BrowserRouter>
            <div>
              <Header user={user} logout={fetchLogOut} />
              <Switch>
                 <Route exact path="/" render={
                   user == undefined ?
                   ()=><Redirect to="/jobs"/>
                   :
                   ()=><AuthContainer/>
                 }/>

                 <Route path="/jobs" component={
                   user!=undefined?
                   JobsContainer
                   :
                   AuthContainer
                 }/>
                 <Route path="/companies" component={
                   user!=undefined?
                   CompaniesContainer
                   :
                   AuthContainer
                 }/>
                 <Route path="/login" component={
                   user!=undefined?
                   JobsContainer
                   :
                   AuthContainer
                 }/>
                 <Route path="/register" component={
                   user!=undefined?
                   JobsContainer
                   :
                   AuthContainer
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
    user:state.userState.user,
    error:state.authState.error
  }
);


export default connect(mapStateToProps)(App);
