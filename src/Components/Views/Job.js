import React, {Component} from 'react';
import IconButton from './IconButton';
import reactCSS from 'reactcss';

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

function Job(props){
  return(
    <li id={props._id} className="list-group-item d-flex flex-row align-items-center">
      <div className="d-flex flex-row">
        <IconButton name='clear' onClick={()=>props.onRemove(props._id)}/>
      </div>
        <div className="d-flex flex-row showDetails" data-toggle="modal" data-target="#myModal" style={{flexGrow:'1',}} onClick={()=>props.onClick(props._id)}>
          <img src={
              props.image===undefined ?
                require('./company.jpg') //use alternative image when none avaliable
              :
                require(props.image)
            } style={styles.image} className="rounded-circle mx-2"/>
          <div className="mx-3 d-flex flex-row align-items-center hidden-sm-down">
            <div className="mr-2 text-muted">Job:</div>
            <div className="h6 mb-0">{props.text1}</div>
          </div>
          <div className="mx-3 d-flex flex-row align-items-center ">
            <div className="mr-2 text-muted">Company:</div>
            <div className="h6 mb-0">{props.text2}</div>
          </div>
        </div>
    </li>
  );
}





//Styles


export default Job;
