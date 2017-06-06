import React, {Component} from 'react';
import reactCSS from 'reactcss';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Actions/auth';

const styles = reactCSS({
  'default':{
    card:{
      maxWidth:"400px"
    }
  }
});

class Register extends Component{
  constructor(props){
    super(props);
    this.state={

    };

  }

  render(){
    const {dispatch,isFetching,email,name,userId,message,auth}=this.props;
    const fetchLogin = bindActionCreators(Actions.fetchLogin,dispatch);
    const fetchRegister = bindActionCreators(Actions.fetchRegister,dispatch);
    return (
      <div className="card jLogin">
        <div className="card-header">
          <h4>Register</h4>
        </div>
        <div className="card-block">
          <form>
            <div className="form-group d-flex flex-column">
              <label for="inputEmail">Email address</label>
              <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group d-flex flex-column">
              <label for="inputName">Name</label>
              <input type="text" class="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter name"/>
            </div>
            <div className="form-group d-flex flex-column">
              <label for="inputPassword">Password</label>
              <input type="password" class="form-control" id="inputConfirmPassword" aria-describedby="nameHelp" placeholder="Enter password"/>
            </div>
            <div className="form-group d-flex flex-column">
              <label for="inputConfirmPassword">Confirm Password</label>
              <input type="password" class="form-control" id="inputConfirmPassword" aria-describedby="nameHelp" placeholder="Confirm password"/>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <a href="#" className="btn btn-primary ml-auto">Submit</a>
        </div>
      </div>
    );
  }

}
const mapStateToProps= state =>(
    {
      isFetching:state.isFetching,
      email:state.email,
      name:state.name,
      userId:state.userId,
      message:state.message,
      auth:state.auth
    }
);

export default connect(mapStateToProps)(Register);
