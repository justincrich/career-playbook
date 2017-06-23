// REACT
import React, { Component } from 'react';

// VIEWS
import Login from '../Views/Login';
import Register from '../Views/Register';

//REDUX HANDLERS
import * as Actions from '../../Actions/auth';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

//Components
import ErrNotification from '../Notifications/ErrNotification';
import SuccessNotification from '../Notifications/SuccessNotification';

//CSS
// import '../../../css/template.css';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class AuthContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      auth:0,
      fetching:false,
      register:false,
      login:true,
      created:false
    };
    this.toggle.bind(this);
    this.successReg.bind(this);
  }


  toggle(){
    this.setState(prevState => ({
      register: !prevState.register,
      login: !prevState.login
    }));
  }

  successReg(){
    this.setState(prevState=>({
      created:!prevState.created
    }));
  }



  render(){

    // Redux variables and methods
    const {dispatch,isFetching,email,name,userId,message,auth,error,success}=this.props;
    const fetchLogin = bindActionCreators(Actions.fetchLogin,dispatch);
    const fetchRegister = bindActionCreators(Actions.fetchRegister,dispatch);
    const dismissError = bindActionCreators(Actions.dismissError,dispatch);
    const dismissSuccess = bindActionCreators(Actions.dismissSuccess,dispatch);
    const throwSuccess = bindActionCreators(Actions.throwSuccess,dispatch);
    const throwError = bindActionCreators(Actions.throwError,dispatch);
    return(
      <div>
        <SuccessNotification message={message} visible={success} dismiss={dismissSuccess}/>
        <ErrNotification message={message} visible={error} dismiss={dismissError}/>
        {this.state.login &&
          <Login toggle={this.toggle.bind(this)} error={email} login={fetchLogin} />
        }
        {this.state.register &&
          <Register toggle={this.toggle.bind(this)} register={fetchRegister}
                    throwError={throwError} throwSuccess={throwSuccess}/>
        }
      </div>
    );
  }
}

const mapStateToProps= state =>(
    {
      isFetching:state.authState.isFetching,
      email:state.authState.email,
      name:state.authState.name,
      userId:state.authState.userId,
      message:state.authState.message,
      auth:state.authState.auth,
      error:state.authState.error,
      success:state.authState.success

    }
);
export default connect(mapStateToProps)(AuthContainer);
