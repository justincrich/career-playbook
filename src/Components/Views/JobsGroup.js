import React, {Component} from 'react';
import Job from './Job';
import JobModal from './JobModal';



const JobsGroup = (props) => {

  return(

      <div className="">
        <ul className="list-group w-100">
          {
            props.jobs.map((job,index)=>{
              return(
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
              );
          })}


        </ul>

      </div>

  );

}



export default JobsGroup;
