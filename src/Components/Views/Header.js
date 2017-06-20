import React from 'react';
import { NavLink } from 'react-router-dom';
import Radium from 'radium';
const styles = {
  hBody:{
    background:'#607d8b', //Background Blue Grey
    padding:"0 16px",
    height:"62px"
  },
  hBrand:{
    padding:"16px"
  },
  hOptions:{
    height:"100%"
  },
  hLogout:{
    color:"#FFF",
    height:"100%",
    ":hover":{
      background:"#485e68"
    }
  },
  hNavLi:{
    height:"100%",
    ":hover":{
      background:"#485e68"
    }
  },
  hLinkText:{
    color:"#FFF"
  }



};



const Header = (props) => (
  <nav  className="navBody navbar navbar-toggleable-md navbar-inverse bg-faded d-flex">
    <div className="navBrand navbar-brand">Playbook</div>
        <div className="navOptions collapse navbar-collapse h-100 " id="navbarNav">
          {props.user != undefined &&
            <div className="navActions">
              <ul className="navbar-nav mr-auto h-100 ">
                <li className="navLi nav-item d-flex align-items-center">
                  <NavLink className="nav-link h-100 py-auto d-flex" to="/jobs"><div className="align-self-center navLinkText ">Jobs</div></NavLink>
                </li>
                <li className="navLi nav-item h-100 d-flex align-items-center">
                  <NavLink  className="nav-link h-100 d-flex" to="/companies"><div className="navLinkText align-self-center">Companies</div></NavLink>
                </li>
              </ul>
              <div onClick={()=>props.logout()} className="navLi h-100 d-flex align-items-center  px-2">
                <a className="navLinkText">Logout</a>
              </div>
            </div>
          }

      </div>


      <button  className="navbar-toggler navbar-toggler-right align-self-center"  type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" ></span>
      </button>
  </nav>
);


export default Radium(Header);
