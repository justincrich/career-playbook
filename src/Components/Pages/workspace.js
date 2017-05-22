import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  withRouter
} from 'react-router-dom';
class Workspace extends Component{
  constructor(props){
    super(props);
  }

  render(){
      return(
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Activity</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/network">Network</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/companies">Companies</NavLink>
            </li>
          </ul>
        </div>
        <div className="card-block">
        </div>
      </div>
    );
  }
}

export default Workspace;
