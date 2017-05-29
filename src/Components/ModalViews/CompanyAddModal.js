import React, {Component} from 'react';
import reactCSS from 'reactcss';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from 'axios';
import * as Endpoints from '../../endpoints';
import fetch from 'isomorphic-fetch';
import GDCompany from './GDCompany';

//CSS
import '../../../css/template.css';
//Styling
const styles = reactCSS({
  'default':{
    jmodal:{
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

  }
});

class CompanyAddModal extends Component{
  constructor(props){
    super(props);
    this.state={
      _id:1,
      gdID:-1,
      name:"",
      logo:"",
      website:"",
      overallRating:"",
      ratingDescription:"",
      industry:"",
      gdLoading:false,
      companies:[],
      query:""
    }
    this.getCompanies.bind(this);
    this.listCompanies.bind(this);
    this.handleInput.bind(this);
  }

onSave(){
  this.props.save({
    gdID:this.state.gdID,
    name:this.state.name,
    logo:this.state.logo,
    website:this.state.website,
    overallRating:this.state.overallRating,
    ratingDescription:this.state.ratingDescription,
    industry:this.state.industry
  });
  this.props.close()
}

handleInput(event){
  console.log(event.target.value);
  this.setState({query:event.target.value});
  this.getCompanies(event.target.value);
}

getCompanies(query){
  var useSSL = 'https:' === document.location.protocol;
  var url = (useSSL ? 'https://':'http://')+Endpoints.IPADDRESS;
  var init = {method:'GET',mode:'nocors'};
  var req = new Request(url,init);
  this.setState({
    gdLoading:true
  });
  fetch(req)
    .then(response=>{
      var useSSL = 'https:' === document.location.protocol;
      var ip = response.ip;
      var userAgent = navigator.userAgent;
      var urlGD = (useSSL ? 'https://':'http://')+Endpoints.GLASSDOOR+'?t.p='+
      Endpoints.GD_ID+'&t.k='+Endpoints.GD_KEY+"&userip="+ip+"&useragent='"+userAgent+
      "'&format=json&v=1&action=employers&q="+query;
      var init = {method:'GET',mode:'nocors'};
      var req = new Request(urlGD,init);
      fetch(req)
      .then(response=>response.json())
      .then(json=>{
        console.log("HERE YOU go",json);
        this.setState({
          companies:json.response.employers.map((company,index)=>(
            {
              _id:company.id,
              gdID:company.id,
              name:company.name,
              logo:company.squareLogo,
              website:company.website,
              overallRating:company.overallRating,
              ratingDescription:company.ratingDescription,
              industry:company.industry
            })),
          gdLoading:false
        });

      });
    });
}

listCompanies(){
  console.log("LDKJF:DSLKJ",this.state.companies);
  return this.state.companies.map((company,index)=>(
    <GDCompany
      key={company._id}
      company={company}
      index={index}
      onClick={(id)=>{console.log(id)}}
      onRemove={()=>console.log()}
    />
  ));
}

// handleInput(event,type){
//
//   switch(type){
//     case "title":
//       this.setState({title: event.target.value});
//       break;
//     case "companyName":
//       this.setState({companyName: event.target.value});
//       break;
//     case "url":
//       this.setState({url: event.target.value});
//       break;
//     case "note":
//       this.setState({note: event.target.value});
//       break;
//     default:
//   }
// }

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
          <div style={styles.jmodalbackdrop} onClick={()=>this.props.close()} />

        }
      </CSSTransitionGroup>

        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
            {this.props.modalState &&
                <div key={key} className="card jModal" >
                  <div className="card-header " style={styles.modalHeaderFooter}>
                    <h5>Add Company</h5>
                  </div>
                  <div className="card-block">
                    <div>
                      <div className="input-group mb-3">
                        <span className="input-group-addon" id="company-search" ><i className="material-icons">search</i></span>
                        <input type="search" onChange={(event)=>this.handleInput(event)} className="form-control" placeholder="Search" aria-describedby="sizing-addon2"/>
                      </div>
                      <div>
                        <ul className="list-group">
                          {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                          <li className="list-group-item">Morbi leo risus</li>
                          <li className="list-group-item">Porta ac consectetur ac</li>
                          <li className="list-group-item">Vestibulum at eros</li> */}
                          {
                            this.state.companies.length > 0 &&
                            this.listCompanies()
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end" style={styles.modalHeaderFooter}>
                      <button type="button" className="btn btn-primary mr-3" onClick={()=>this.getCompanies(this.state.query)}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>this.props.close()}>Cancel</button>
                  </div>
                </div>
            }

        </CSSTransitionGroup>
        </div>

    );
  }
}

export default CompanyAddModal;
