import React, {Component} from 'react';
import JobView from './ModalViews/JobView';

class MyModal extends Component{
  constructor(props){
    super(props);
    //console.log("mymodal".this.props.show);
  }


  render(){
    return(
      <div id="mymodal" className="modal fade bd-example-modal-lg"  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

        <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title">{this.props.modaltitle}</h5> */}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">


          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default MyModal;
