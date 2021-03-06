import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import * as Endpoints from '../../endpoints';
import GDCompany from './GDCompany';
import Radium from 'radium';

//CSS
import '../../../css/template.css';
//Styling


class CompanyAddModal extends Component{
  constructor(props){
    super(props);
    this.state={
      user:this.props.user,
      gdID:-1,
      name:"",
      logo:"",
      website:"",
      overallRating:"",
      ratingDescription:"",
      industry:"",
      gdLoading:false,
      companies:[],
      query:"",
      styles:{
        joverflow:{
          height:"300px",
          overflow:"scroll",
        },
        jmodal:{
          zIndex:1000,
          position:'absolute',
          width: '90%',
          top:"72px",
          left:'5%',
          right:'5%',
          "@media (min-width:768px)": {
            width:'50%',
            left:'25%',
            right:'25%',
            top:"72px"
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
        }
    }
  }
    this.getCompanies.bind(this);
    this.listCompanies.bind(this);
    this.handleInput.bind(this);
    this.onAdd.bind(this);
  }

onAdd(company){

  var compIndex = -1;

  for (var i=0;i< this.state.companies.length ;i++){
    if(this.state.companies[i].gdID.toString() == company.gdID.toString()){
      compIndex = i;
    }
  }

  if (compIndex>-1){
    this.setState({
      companies:[...this.state.companies.slice(0, compIndex),
				...this.state.companies.slice(compIndex + 1)]
    });
  }

  this.props.save(company);


}

handleInput(event){
  this.setState({query:event.target.value});
  this.getCompanies(event.target.value);
}

//Using Axios because fetch doesn't allow call back progress indicators

getCompanies(query){
  var useSSL = 'https:' === document.location.protocol;
  var gdExist = [];

  this.setState({
    gdLoading:true
  });
  var urlCheck = (useSSL ? 'https://':'http://') + Endpoints.GDID;
  axios.get("/api/user/"+this.props.user._id+Endpoints.GDID).then(response=>{
    //get the current GD IDs
    gdExist = Object.keys(response.data);
    var url = (useSSL ? 'https://':'http://')+Endpoints.IPADDRESS;
    axios.get(url).then(response=>{
      var ip = response.ip;
      var userAgent = navigator.userAgent;
      var urlGD = (useSSL ? 'https://':'http://')+Endpoints.GLASSDOOR+'?t.p='+
      Endpoints.GD_ID+'&t.k='+Endpoints.GD_KEY+"&userip="+ip+"&useragent='"+userAgent+
      "'&format=json&v=1&action=employers&q="+query;
      console.log("gd url", urlGD);
      axios.get(urlGD).then(json=>{
        this.setState({
                  companies:json.data.response.employers.filter((company)=>{
                        return gdExist.indexOf(company.id.toString())<0;
                      }
                    ),
                  gdLoading:false
      });
    });

    });
});
}

listCompanies(){
  return this.state.companies.map((company,index)=>(
    <GDCompany
      key={company.id}
      company={company}
      index={index}
      add={(company)=>this.onAdd(
        {
            gdID:company.id,
            name:company.name,
            logo:company.squareLogo,
            website:company.website,
            overallRating:company.overallRating,
            ratingDescription:company.ratingDescription,
            industry:company.industry
          }
      )}
    />
  ));
}


  render(){

    var key = 1;
    return(
      <div>
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
                <div key={key} style={this.state.styles.jmodal} className="card jModal" >
                  <div className="card-header " style={this.state.styles.modalHeaderFooter}>
                    <h5>Add Company</h5>
                  </div>
                  <div className="card-block">
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-addon" id="company-search" ><i className="material-icons">search</i></span>
                        <input type="search" onChange={(event)=>this.handleInput(event)} className="form-control" placeholder="Search" aria-describedby="sizing-addon2"/>
                      </div>
                      <div style={this.state.styles.joverflow}>
                        <ul className="list-group">
                          {
                            this.state.companies.length > 0 &&
                            this.listCompanies()
                          }
                          {
                            this.state.gdLoading &&
                            <div className=" ">
                              <h6>Searching ...</h6>
                            </div>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer d-flex" style={this.state.styles.modalHeaderFooter}>
                    <a href='https://www.glassdoor.com/index.htm'>powered by <img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' title='Job Search' /></a>
                    <button type="button" className="btn btn-secondary ml-auto" onClick={()=>this.props.close()}>Cancel</button>
                  </div>
                </div>
            }

        </CSSTransitionGroup>
        </div>

    );
  }
}

export default Radium(CompanyAddModal);
