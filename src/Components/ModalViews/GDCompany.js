import React, {Component} from 'react';
import IconButton from '../Views/IconButton';
import reactCSS from 'reactcss';

//Styling
import '../../../css/template.css';
const styles = reactCSS({
  'default':{
    image:{
      width:'50px',
      height:'50px',
      border:'1px solid #D8D8DA',
    }
  }
});

var id= "";

function GDCompany(props){
  console.log("LOGO:",props.company.logo);
  return(
    <li id={props.company._id} className="list-group-item d-flex flex-row align-items-center">
        <div className="d-flex flex-row showDetails" data-toggle="modal" data-target="#myModal" style={{flexGrow:'1',}} onClick={()=>props.onClick(props._id)}>
          <img src={
              props.company.logo==="" ?
                require('../../Media/company.jpg') //use alternative image when none avaliable
              :
                props.company.logo
            } style={styles.image} className="rounded-circle mx-2"/>
            <div className="mx-3 d-flex flex-row align-items-center flex-nowrap">
              <div className="h6 mb-0">{props.company.name}</div>
            </div>
        </div>
        <div className="d-flex flex-row">
          <IconButton name='clear' onClick={()=>props.onRemove(props.company._id)}/>
        </div>
    </li>
  );
}





//Styles


export default GDCompany;
