import React from 'react';
import { NavLink } from 'react-router-dom';
import Radium from 'radium';

const styles = {
  header:{
    background:'#607d8b' //Background Blue Grey
  }
};

// 'default':{
//   body:{
//     background:'#607d8b' //Background Blue Grey
//   },
//   textcolor:{
//     color:'#fefefe'
//   },
//   button:{
//     backgroundColor:'#607d8b',
//     borderColor:'#fefefe',
//     color:'#fefefe'
//   }
// }

const Header = (props) => (
  <nav style={styles.header} className="navbar navbar-toggleable-md navbar-inverse bg-faded">
    {props.auth == 1 &&
      <button  className="navbar-toggler navbar-toggler-right"  type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" ></span>
      </button>
    }
    <div  className="navbar-brand">Playbook</div>
    {props.auth == 1 &&
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-md-0">
            <li  className="nav-item">
              <NavLink  className="nav-link" to="/jobs"><div style={styles.textcolor}>Jobs</div></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/companies"><div style={styles.textcolor}>Companies</div></NavLink>
            </li>
          </ul>
          <button style={styles.button} className="btn btn-secondary my-2 my-sm-0" type="submit">Logout</button>
      </div>
    }
  </nav>
);


export default Header;
