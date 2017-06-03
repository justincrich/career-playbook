import React from 'react';
import { NavLink } from 'react-router-dom';
import reactCSS from 'reactcss';

const styles = reactCSS({
  'default':{
    body:{
      background:'#607d8b' //Background Blue Grey
    },
    brand:{
      color:'#fefefe'
    }
  }
});

const Header = () => (
  <nav style={styles.body} className="navbar navbar-toggleable-md navbar-light bg-faded">
    {/* <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div style={styles.brand} className="navbar-brand">Playbook</div>
  </nav>
);


export default Header;
{/* <NavLink to="/desktop">Desktop</NavLink> */}
