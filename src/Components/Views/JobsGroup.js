import React, {Component} from 'react';
import Job from './Job';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import IconButton from './IconButton';
import JobCreateModal from '../ModalViews/JobAddModal';
import reactCSS from 'reactcss';
import defaultIMG from './company.jpg';

//CSS
import '../../../css/template.css';

// More CSS Stuffs
const styles = reactCSS({
  'default':{
    addButton:{
      height:"42px",
    }

  }
});

class JobsGroup extends Component{
  constructor(props){
    super(props);
    this.state={
      addModal:false,
      query:""
    };
    this.closeModal.bind(this);
    this.handleInput.bind(this);
  }

  openModal(){
    this.setState({
      addModal:true,
    });
  }

  closeModal(){

    this.setState({
      addModal:false,
    });
  }

  listJobs(arr){
    var defaultIMG = "company.jpg";
    return arr.map((job,index)=>(
        <Job
          key={job._id}
          _id={job._id}
          text1={job.title}
          icon1={this.props.icon1}
          text2={job.companyName}
          icon2={this.props.icon2}
          image={
                job.image
            }
          index={index}
          onClick={(id)=>this.props.selectJob(id)}
          onRemove={this.props.onRemove}
        />
      ));
  }

  handleInput(event){
    this.setState({query:event.target.value});
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.query!==nextState.query){
      this.props.onSearch(nextState.query);
    }
  }

  render(){
      return(
            <div className="container ">
              <div className="d-flex flex-row align-center w-100 mb-2">
                  <div className="input-group">
                    <span className="input-group-addon" id="job-search" onClick={()=>this.search()} ><i className="material-icons">search</i></span>
                    <input type="search" onChange={(event)=>this.handleInput(event)} className="form-control" placeholder="Search" aria-describedby="sizing-addon2"/>
                  </div>

                <div className="ml-3">
                  <button type="button" style={styles.addButton} className="btn btn-secondary py-2" onClick={()=>this.openModal()}><i className="material-icons">add</i></button>
                </div>
              </div>
                {this.state.query.length === 0 ?
                  this.listJobs(this.props.jobs)
                  :
                  this.listJobs(this.props.searchresults)
                }
                <JobCreateModal  save={this.props.addJob} modalState={this.state.addModal} close={()=>this.closeModal()}/>
          </div>

      );
  }


}



export default JobsGroup;
