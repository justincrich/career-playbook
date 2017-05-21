import React, {Component} from 'react';
import JobView from './ModalViews/JobView';

class MyModal extends Component{
  constructor(props){
    super(props);
    this.OnEdit = this.OnEdit.bind(this);
    this.state={
      modalstate:false,
      editmode:false,
    };
    //console.log("mymodal".this.props.show);
  }

  OnEdit(){
    this.setState({editmode:true});
    console.log(this.state.editmode);
  }


  render(){

    return(
      <div id="mymodal" className="modal fade bd-example-modal-lg"  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

        <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.props.modaltitle}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {this.props.modalCall === 'jobs/GET_JOB' ?
              <JobView data={this.props.data} editmode={this.state.editmode}/>
              :
              <div></div>
            }

          </div>
          <div className="modal-footer">
            {this.state.editmode?
              <button type="button" className="btn btn-primary">Save changes</button>
            :
            <button type="button" className="btn btn-secondary"  onClick={this.OnEdit}>Edit</button>
            }
            <button type="button" className="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default MyModal;
