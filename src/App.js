import React, {Component} from 'react';
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
import * as AuthActions from './Actions/auth';
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
    const {dispatch, auth}=this.props;
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
    isFetching:state.isFetching,
    message:state.message,
    auth:state.auth
  }
);


export default connect(mapStateToProps)(App);
