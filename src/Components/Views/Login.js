import React, {Component} from 'react';
import reactCSS from 'reactcss';

const styles = reactCSS({
  'default':{
    card:{
      maxWidth:"400px"
    }
  }
});
class Login extends Component{
  constructor(props){
    super(props);
    this.state={

    };

  }

  render(){
    return (
      <div style={styles.card} className="card mt-3">
        <div className="card-header">
          <h4>Register</h4>
        </div>
        <div className="card-block">
          <form>
            <div className="form-group d-flex flex-column">
              <label for="inputEmail">Email address</label>
              <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group d-flex flex-column">
              <label for="inputPassword">Password</label>
              <input type="password" class="form-control" id="inputConfirmPassword" aria-describedby="nameHelp" placeholder="Enter password"/>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <a href="#" className="btn btn-secondary mr-3">Register</a>
          <a href="#" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }

}

export default Login;
