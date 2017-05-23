import React, {Component} from 'react';


class MyModal extends Component{
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
    return(
      <div>

        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.headerTitle}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                {this.state.editmode?
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.onSave()}>Save changes</button>
                :
                <button type="button" className="btn btn-secondary"  onClick={()=>this.onEdit()}>Edit</button>
                }
                {this.state.editmode?
                <button type="button" className="btn btn-secondary" onClick={()=>this.onEdit()}>Cancel</button>
                :
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default MyModal;
