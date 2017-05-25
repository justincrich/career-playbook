import React, {Component} from 'react';
import Job from './Job';
import JobModal from './JobModal';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

//CSS
import '../../../css/template.css';


const JobsGroup = (props) => {
let jobs = props.jobs.map((job,index)=>(
    <Job
      key={job._id}
      _id={job._id}
      text1={job.title}
      icon1={props.icon1}
      text2={job.companyName}
      icon2={props.icon2}
      image={job.image}
      index={index}
      onClick={(id)=>props.selectJob(id)}
      onRemove={props.onRemove}
    />
  ));
  return(

      <div className="">
        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          component="ul"
          >
            {jobs}
        </CSSTransitionGroup>


      </div>

  );

}



export default JobsGroup;
