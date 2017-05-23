import React, {Component} from 'react';
import IconButton from './IconButton';
import Radium from 'radium';

const divImgStyle = {
  width:'50px',
  height:'50px',
  border:'1px solid #D8D8DA',
};

var id= "";

function Job(props){
  return(
    <li id={props._id} className="list-group-item d-flex flex-row align-items-center">
      <div className="d-flex flex-row">
        <IconButton name='clear' onClick={()=>props.onRemove(props._id)}/>
      </div>
        <div className="d-flex flex-row showDetails" data-toggle="modal" data-target="#myModal" style={{flexGrow:'1',}} onClick={()=>props.onClick(props._id)}>
          <img src={props.image} style={divImgStyle} className="rounded-circle mx-2"/>
          <div className="mx-3 d-flex flex-row align-items-center hidden-sm-down">
            <i className="material-icons mr-2">{props.icon1}</i>
            {props.text1}
          </div>
          <div className="mx-3 d-flex flex-row align-items-center ">
            <i className="material-icons mr-2">{props.icon2}</i>
            {props.text2}
          </div>
        </div>
    </li>
  );
}





//Styles


export default Radium(Job);
