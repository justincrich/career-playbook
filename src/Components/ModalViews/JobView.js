import React, {Component} from 'react';


class JobView extends Component{
  constructor(props){
    super(props);
    this.state={
      editmode:false,
    };
  }


  render(){           
    return(
      <div>
        <form>
          <div className="form-group">
            <label for="jobTitleInputLabel">Job Title</label>
            {this.props.editmode?
              <input type="text" className="form-control" value={this.props.title} id="jobTitleInput" placeholder=""/>
              :
              <div>{this.props.title}</div>
            }

          </div>
          <div className="form-group">
            <label for="companyNameInputLabel">Company Name</label>
            {this.props.editmode?
              <input type="text" value={this.props.company} className="form-control" id="companyNameInput" placeholder=""/>
              :
              <div>{this.props.company}</div>
            }
          </div>


            {this.props.editmode?
              <div className="form-group">
                <label for="urlInputLabel">Link To Job Listing</label>
                <input type="text" className="form-control" id="urlInputLabel" value={this.props.url} placeholder=""/>
              </div>
              :
              <div></div>
            }

          <div className="form-group">
            <label for="notesInputLabel">Notes</label>
            {this.props.editmode?
              <textarea className="form-control" id="notesInputLabel" value={this.props.notes} rows="3"></textarea>
              :
              <div>{this.props.notes}</div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default JobView;
