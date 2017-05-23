import React, {Component} from 'react';
import { Route, NavLink, Redirect } from 'react-router';
import {connect} from 'react-redux';
import JobsContainer from '../Containers/JobsContainer';
import MyModal from '../Views/MyModal';

const Desktop =({match})=>(
      <div className="container">
        <div className="card my-5">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a className="nav-link" href="#">Jobs</a>
              </li>
            </ul>
          </div>
          <div className="card-block">
            {/* Routes */}
            <Route exact path={match.path}
                 render={ () => <Redirect to={`${match.path}/jobs`} /> } />
            {/* <Route path={`${match.path}/jobs`}
                render={ () => <JobsContainer /> } /> */}
                <Route path={`${match.path}/jobs`} component={JobsContainer}/>
          </div>
        </div>

      </div>
    );

export default Desktop;
