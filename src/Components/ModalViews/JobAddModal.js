import React, {Component} from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

//CSS
import '../../../css/template.css';
//Styling


class JobAddModal extends Component{
  constructor(props){
    super(props);
    this.state={
      titleValid:true,
      companyValid: true,
      urlValid: true,
      _id:(new Date).getTime(),
      title:"",
      companyID:(new Date).getTime(),
      companyName:"",
      url:"",
      note:"",
      styles:{
        jmodal:{
          zIndex:'1000',
          position:'fixed',
          width: '90%',
          top:"5%",
          left:'5%',
          right:'5%',
          "@media (min-width:768px)": {
            width:'50%',
            left:'25%',
            right:'25%',
            top:"85px"
          },
        },
        jmodalbackdrop:{
          position: "fixed",
          top:"0px",
          left:"0px",
          width:"100%",
          height:"100%",
          background:"rgba(0,0,0,0.4)",
          zIndex:"990"
        },
        modalHeaderFooter:{
          background:"white"
        },
        jobModalHolder:{
            position:'fixed',
            zIndex:'1000',
            height:'100%'
        }
      }
    }
    this.validate.bind(this);
  }

onSave(){
  if(this.validate()){
    this.props.save({
      title:this.state.title,
      companyID:this.state.companyID,
      companyName:this.state.companyName,
      url:this.state.url,
      note:this.state.note
    });
    this.props.close()
  }
}

validate(){
  var valid = true;
  if(!this.state.title || this.state.title.length === 0){
    this.setState({
      titleValid:false
    });
    valid = false;
  }else{
    this.setState({
      titleValid:true
    });
  }
  if(!this.state.companyName || this.state.companyName.length === 0){
    this.setState({
      companyValid:false
    });
    valid = false;
  }else{
    this.setState({
      companyValid:true
    });
  }
  if(!this.state.url || this.state.url.length === 0){
    this.setState({
      urlValid:false
    });
    valid = false;
  }else{
    this.setState({
      urlValid:true
    });
  }
  return valid;
}

handleInput(event,type){

  switch(type){
    case "title":
      this.setState({title: event.target.value});
      break;
    case "companyName":
      this.setState({companyName: event.target.value});
      break;
    case "url":
      this.setState({url: event.target.value});
      break;
    case "note":
      this.setState({note: event.target.value});
      break;
    default:
  }
}

  render(){

    var key = 1;
    var normal = 'form-group';
    var normalInput = 'form-control';
    var danger = 'form-group has-danger';
    var dangerInput = 'form-control form-control-danger';
    return(
      <div style={this.state.styles.jobModalHolder} className="jobModalHolder">
        <CSSTransitionGroup
          transitionName="modalBackground"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
        {this.props.modalState &&
          <div style={this.state.styles.jmodalbackdrop} onClick={()=>this.props.close()} />
        }
      </CSSTransitionGroup>

        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
            {this.props.modalState &&
                <div key={key} style={this.state.styles.jmodal} className="card" >
                  <div className="card-header " style={this.state.styles.modalHeaderFooter}>
                    <h5>Add Job</h5>
                  </div>
                  <div className="card-block">
                    <div>
                      <form>
                        <div className={
                          this.state.titleValid ?
                          normal
                          :
                          danger
                        }>
                          <label htmlFor="jobTitleInputLabel" className="text-muted">Job Title</label>
                            <input type="text" className={
                              this.state.titleValid ?
                              normalInput
                              :
                              dangerInput
                            }
                               id="jobTitleInput" placeholder="" onChange={(event)=>this.handleInput(event,"title")}/>
                            {!this.state.titleValid &&
                              <div className="form-control-feedback">Please provide the job title.</div>
                            }
                        </div>
                        <div className={
                          this.state.companyValid ?
                          normal
                          :
                          danger
                        }>
                          <label htmlFor="companyNameInputLabel" className="text-muted">Company Name</label>
                            <input type="text" onChange={(event)=>this.handleInput(event,"companyName")}
                              className={
                                this.state.companyValid ?
                                normalInput
                                :
                                dangerInput
                              }
                              id="companyNameInput" placeholder=""/>
                              {!this.state.companyValid &&
                                <div className="form-control-feedback">Please provide the company name.</div>
                              }
                        </div>
                        <div className={
                          this.state.urlValid ?
                          normal
                          :
                          danger
                        }>
                          <label htmlFor="urlInputLabel" className="text-muted">Link</label>
                          <input type="text" className={
                            this.state.urlValid ?
                            normalInput
                            :
                            dangerInput
                          }
                            id="urlInputLabel" onChange={(event)=>this.handleInput(event,"url")} placeholder=""/>
                            {!this.state.urlValid &&
                              <div className="form-control-feedback">Please provide a link to the job listing</div>
                            }
                        </div>
                        <div className="form-group">
                          <label htmlFor="notesInputLabel" className="text-muted">Notes</label>
                            <textarea className="form-control" id="notesInputLabel" onChange={(event)=>this.handleInput(event,"note")}rows="3"></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end" style={this.state.styles.modalHeaderFooter}>
                      <button type="button" className="btn btn-primary mr-3" onClick={()=>this.onSave()}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>this.props.close()}>Cancel</button>
                  </div>
                </div>
            }

        </CSSTransitionGroup>
        </div>
    );
  }
}

export default Radium(JobAddModal);
