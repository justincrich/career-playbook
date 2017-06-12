import React from 'react';
import IconButton from './IconButton';
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


function Company(props){
  return(
    <li id={props.company._id} className="list-group-item flex-nowrap d-flex flex-row align-items-center">
        <IconButton name='clear' onClick={()=>props.delete(props.company._id)}/>
        <div className="showDetails text-truncate flex-nowrap d-flex flex-row align-items-center" data-toggle="modal" data-target="#myModal" style={{flexGrow:'1',}} onClick={()=>props.onClick(props.company)}>
          <img src={
              props.company.logo==="" ?
                require('../../Media/company.jpg') //use alternative image when none avaliable
              :
                props.company.logo
            } style={styles.image} className="rounded-circle mx-2"/>
          <div className="h6 mx-3 text-truncate">{props.company.name}</div>

          <div className="mb-0 mx-3 hidden-sm-down text-muted">{props.company.industry}</div>
        </div>
    </li>
  );
}





//Styles


export default Company;
