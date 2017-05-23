import React, {Component} from 'react';


class JobModalView extends Component{
  constructor(props){
    super(props);

  }


  render(){

    return(
      <div>
        <form>
          <div className="form-group">
            <label for="jobTitleInputLabel">Job Title</label>
            {this.props.editmode?
              <input type="text" className="form-control" value={this.props.data.title} id="jobTitleInput" placeholder=""/>
              :
              <div></div>
            }

          </div>
          <div className="form-group">
            <label for="companyNameInputLabel">Company Name</label>
            {this.props.editmode?
              <input type="text" value={this.props.data.companyName} className="form-control" id="companyNameInput" placeholder=""/>
              :
              <div></div>
            }
          </div>


            {this.props.editmode?
              <div className="form-group">
                <label for="urlInputLabel">Link To Job Listing</label>
                <input type="text" className="form-control" id="urlInputLabel" value={this.props.data.url} placeholder=""/>
              </div>
              :
              <div></div>
            }

          <div className="form-group">
            <label for="notesInputLabel">Notes</label>
            {this.props.editmode?
              <textarea className="form-control" id="notesInputLabel" value={this.props.data.notes} rows="3"></textarea>
              :
              <div></div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default JobModalView;
