import React, {Component} from 'react';
import reactCSS, {hover} from 'reactcss';

//Styling
import '../../../css/template.css';
import Radium from 'radium'
const image = {
  base:{
    width:'50px',
    height:'50px',
    border:'1px solid #D8D8DA',
  }
};
const icon ={
  base:{
    color:'black',
  },
  ':focus': {
      background:'transparent',
      boxShadow:"none",
    },
    ':hover': {
        background:'transparent',
        boxShadow:"none",
        color:"#E6E6E6",
      },
}

var id= "";

function GDCompany(props){
  return(
    <li id={props.company.gdID} className="list-group-item d-flex flex-row align-items-center flex-nowrap">
        <div className="d-flex flex-row showDetails" data-toggle="modal" data-target="#myModal" style={{flexGrow:'1',}} onClick={()=>props.onClick(props.gdID)}>
          <img src={
              props.company.logo==="" ?
                require('../../Media/company.jpg') //use alternative image when none avaliable
              :
                props.company.logo
            } style={image.base} className="rounded-circle mx-2"/>
            <div className="mx-3 d-flex flex-row align-items-center flex-nowrap">
              <div className="h6 mb-0">{props.company.name}</div>
            </div>
        </div>
        <div className="d-flex flex-row">
          <a href="#" onClick={(e)=>{
            e.preventDefault();
            props.add(props.company);
          }} style={icon.base} ><i className="material-icons" style={icon}>add</i></a>
        </div>
    </li>
  );
}





//Styles


export default Radium(GDCompany);
