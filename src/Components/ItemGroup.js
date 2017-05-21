import React, {Component} from 'react';
import Item from './Item';

const ItemGroup = (props) => {

  return(

      <div className="">
        <ul className="list-group w-100">
          {
            props.jobs.map((job,index)=>{
              return(
                <Item
                  key={job._id}
                  _id={job._id}
                  text1={job.title}
                  icon1={props.icon1}
                  text2={job.company}
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



export default ItemGroup;
