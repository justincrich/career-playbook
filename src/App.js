/* eslint-disable */
import React, {Component} from 'react';
import Header from './Components/Views/Header';
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
import Radium from 'radium';



class App extends Component{

  constructor(props){
    super(props);
    this.state ={
      styles:{
        body:{
          height:'100%'
        }
      }
    };
    this.isAuthed;
    props.dispatch(UserActions.fetchUser());
  }



  isAuthed(){
    console.log("AUTH");
  }



  render(){
    const {dispatch, isFetching,message,user,error}=this.props;
    const changeAuthStatus = bindActionCreators(AuthActions.changeAuthStatus,dispatch);
    const fetchLogOut = bindActionCreators(AuthActions.fetchLogOut,dispatch);
    const fetchUser = bindActionCreators(UserActions.fetchUser,dispatch);
    return(


            // <BrowserRouter>
            //   <div>
            //     <Header user={user} logout={fetchLogOut} />
            //         <Switch>
            //            <Route exact path="/" render={()=><Redirect to="/jobs"/>}/>
            //            <Route path="/jobs" component={JobsContainer}/>
            //            <Route path="/companies" component={CompaniesContainer}/>
            //          </Switch>
            //   </div>
            // </BrowserRouter>
            <BrowserRouter>
              <div style={this.state.styles.body} className="appContainer">


                <Header user={user} logout={fetchLogOut} user={user}/>
              {isFetching
                ? <div></div>
                :
                    (user == undefined
                      ?
                      <AuthContainer/>
                      :
                      <Switch>
                         <Route exact path="/" render={()=><Redirect to="/jobs"/>}/>
                         <Route path="/jobs" component={JobsContainer}/>
                         <Route path="/companies" component={CompaniesContainer}/>
                       </Switch>
                    )
              }
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

App =  connect(mapStateToProps)(App);
export default Radium(App);
