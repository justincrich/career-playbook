import React, {Component} from 'react';
import reactCSS from 'reactcss';

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
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    };
    this.submit.bind(this);
  }

  handleInput(event,type){

    switch(type){
      case "email":
        this.setState({email: event.target.value});
        break;
      case "password":
        this.setState({password: event.target.value});
        break;
      case "confirmPassword":
        this.setState({confirmPassword: event.target.value});
        break;
        case "name":
          this.setState({name: event.target.value});
        break;
      default:
    }
  }

  submit(){
    var alphaExp = /^[a-zA-Z0-9\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+$/;
    var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(this.state.name,alphaExp.test(this.state.name));
    if(emailExp.test(this.state.email)
        && alphaExp.test(this.state.name)
        && alphaExp.test(this.state.password)
        && alphaExp.test(this.state.confirmPassword)){
        if(this.state.password == this.state.confirmPassword){
          //notify that passwords don't match
          this.props.register(
            this.state.email,
            this.state.name,
            this.state.password,
            this.state.confirmPassword
          );
          this.props.toggle();


        }else{
          this.props.throwError("Passwords don't match, try again.");
          //Register the user

        }
    }else{
      this.props.throwError("All fields must be filled.");
    }
  }

  render(){
    return (
      <div className="card jLogin">
        <div className="card-header">
          <h4>Register</h4>
        </div>
        <div className="card-block">
          <form>
            <div className="form-group d-flex flex-column">
              <label htmlFor="inputEmail">Email address</label>
              <input type="email"
                className="form-control"
                onChange={event=>this.handleInput(event,"email")}
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="inputName">Name</label>
              <input type="text"
                onChange={event=>this.handleInput(event,"name")}
                className="form-control"
                id="inputName"
                aria-describedby="nameHelp"
                placeholder="Enter name"/>
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="inputPassword">Password</label>
              <input type="password"
                onChange={event=>this.handleInput(event,"password")}
                className="form-control"
                id="inputConfirmPassword"
                aria-describedby="nameHelp"
                placeholder="Enter password"/>
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="inputConfirmPassword">Confirm Password</label>
              <input type="password"
                onChange={event=>this.handleInput(event,"confirmPassword")}
                className="form-control"
                id="inputConfirmPassword"
                aria-describedby="nameHelp"
                placeholder="Confirm password"/>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <a href="#" className="btn btn-secondary ml-auto" onClick={()=>this.props.toggle()}>Login</a>
          <a href="#" className="btn btn-primary ml-3" onClick={()=>this.submit()}>Submit</a>
        </div>
      </div>
    );
  }

}

export default Register;
