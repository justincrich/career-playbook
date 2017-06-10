import React from 'react';
import Radium from 'radium';


const divStyle = {
  background:'transparent',
  padding:'0 0 0 0',
  display:'inline-block',
  ':focus': {
      background:'transparent',
      boxShadow:"none",
    },
    ':hover': {
        background:'transparent',
        boxShadow:"none",
        color:"#E6E6E6",
      },
};


const IconButton = (props) => (

  <button type="button" style={divStyle} className="btn iconBtn" onClick={props.onClick}>
    <i className="material-icons">{props.name}</i>
  </button>
);




export default Radium(IconButton);
