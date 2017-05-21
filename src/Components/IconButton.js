import React from 'react';
import { NavLink } from 'react-router-dom';
import Radium from 'radium';


const divStyle = {
  background:'transparent',
  padding:'0 0 0 0',
  ':focus': {
      background:'transparent',
      boxShadow:"none",
    },
    ':hover': {
        background:'transparent',
        boxShadow:"none",
        color:"#F7F7F7",
      },
};


const IconButton = (props) => (

  <button type="button" style={divStyle} className="btn iconBtn" onClick={props.onClick}>
    <i className="material-icons">{props.name}</i>
  </button>
);




export default Radium(IconButton);
