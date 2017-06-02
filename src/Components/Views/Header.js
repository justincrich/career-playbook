import React from 'react';
import { NavLink } from 'react-router-dom';
import reactCSS from 'reactcss';

var styles = reactCSS({});

const Header = () => (
  <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="#">Playbook</a>
    {/* <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/desktop">Desktop</NavLink>
        </li>
      </ul>
    </div> */}
  </nav>
);


export default Header;
{/* <NavLink to="/desktop">Desktop</NavLink> */}
