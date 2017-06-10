import React, {Component} from 'react';
import Radium from 'radium';

const styles = {
    card:{
      width:"400px",
    }
};


class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    };
    this.handleInput.bind(this);

  }

  handleInput(event,type){

    switch(type){
      case "email":
        this.setState({email: event.target.value});
        break;
      case "password":
        this.setState({password: event.target.value});
        break;
      default:
    }
  }



  render(){
    return (

        <div className="card jLogin">
          <div className="card-header">
            <h4>Login</h4>
          </div>
          <div className="card-block">
            <form>
              <div className="form-group d-flex flex-column">
                <label htmlFor="inputEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  onChange={event=>this.handleInput(event,"email")}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"/>
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="inputPassword">Password</label>
                <input type="password"
                  className="form-control"
                  id="inputConfirmPassword"
                  aria-describedby="nameHelp"
                  placeholder="Enter password"
                  onChange={event=>this.handleInput(event,"password")}
                />
              </div>
            </form>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <a href="#" className="btn btn-secondary mr-3" onClick={()=>this.props.toggle()}>Register</a>
            <a href="#" className="btn btn-primary" onClick={()=>this.props.login(this.state.email,this.state.password)}>Login</a>
          </div>
        </div>

    );
  }

}


export default Radium(Login);
