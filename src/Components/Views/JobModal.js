import React, {Component} from 'react';
import reactCSS from 'reactcss';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

//CSS
import './template.css';
//Styling
const styles = reactCSS({
  'default':{
    jmodal:{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      zIndex:"1000"


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
    "modal-enter":{
      transform: "transform: translateX(-100%)"
    },
    "modal-enter":{
      transform: "transform: translateX(-100%)"
    }
  }
});
{



};

class JobModal extends Component{
  constructor(props){
    super(props);
    this.state={
      editmode:false
    }
  }
onEdit(){
  this.setState(prevState => ({
  editmode: !prevState.editmode
}));
  this.props.toggle();
}

onSave(){
  this.setState({
    editmode:false
  });
  this.props.save();
}

  render(){
    var key = 1;
    return(
      <div style={styles.jmodalbackdrop}>
        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={5000}
          component="div"
          >
              {
                <div key={key} className="card example-enter example-enter-active example-leave example-leave-active" style={styles.jmodal}>
                  <div className="card-header" style={styles.modalHeaderFooter}>
                    <h5>Job</h5>
                  </div>
                  <div className="card-block">
                    <div>
                      <form>
                        <div className="form-group">
                          <label htmlFor="jobTitleInputLabel">Job Title</label>
                          {/* {this.props.editmode?
                            <input type="text" className="form-control" value={this.props.data.title} id="jobTitleInput" placeholder=""/>
                            :
                            <div></div>
                          } */}

                        </div>
                        <div className="form-group">
                          <label htmlFor="companyNameInputLabel">Company Name</label>
                          {/* {this.props.editmode?
                            <input type="text" value={this.props.data.companyName} className="form-control" id="companyNameInput" placeholder=""/>
                            :
                            <div></div>
                          } */}
                        </div>


                          {/* {this.props.editmode?
                            <div className="form-group">
                              <label htmlFor="urlInputLabel">Link To Job Listing</label>
                              <input type="text" className="form-control" id="urlInputLabel" value={this.props.data.url} placeholder=""/>
                            </div>
                            :
                            <div></div>
                          } */}

                        <div className="form-group">
                          <label htmlFor="notesInputLabel">Notes</label>
                          {/* {this.props.editmode?
                            <textarea className="form-control" id="notesInputLabel" value={this.props.data.notes} rows="3"></textarea>
                            :
                            <div></div>
                          } */}
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end" style={styles.modalHeaderFooter}>
                    {/* {this.state.editmode?
                      <button type="button" className="btn btn-primary mr-3">Save changes</button>
                    :
                    <button type="button" className="btn btn-secondary mr-3"  onClick={this.OnEdit}>Edit</button>
                    }
                    {this.state.editmode?
                    <button type="button" className="btn btn-secondary" onClick={this.OnEdit}>Cancel</button>
                    :
                    <button type="button" className="btn btn-secondary">Close</button>
                    } */}
                  </div>
                </div>
              }
        </CSSTransitionGroup>
      </div>


    );
  }
}

export default JobModal;
