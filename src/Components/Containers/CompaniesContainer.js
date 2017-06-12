// REACT
import React, { Component } from 'react';

// VIEWS
import CompaniesGroup from '../Views/CompaniesGroup';

//REDUX HANDLERS
import * as Actions from '../../Actions/companies';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../../Store/store';
//CSS
import '../../../css/template.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class CompaniesContainer extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    var state = store.getState();
    var user = state.userState.user;
    store.dispatch(Actions.fetchAllCompanies(user._id));
  }
  render(){
    // Redux variables and methods
    const {dispatch, allCompanies, searchResults,company,user}=this.props;
    const requestCompany = bindActionCreators(Actions.fetchCompany,dispatch);
    const requestAllCompanies = bindActionCreators(Actions.fetchAllCompanies,dispatch);
    const createCompany = bindActionCreators(Actions.fetchCreateCompany,dispatch);
    const deleteCompany = bindActionCreators(Actions.fetchDeleteCompany,dispatch);
    const updateCompany = bindActionCreators(Actions.fetchUpdateCompany,dispatch);
    const searchCompanies = bindActionCreators(Actions.searchCompanies,dispatch);
    const sendCompany = ()=>company;
    return(
      <div>
        <CompaniesGroup companies={allCompanies}
                        searchResults={searchResults}
                        currentCompany={company}
                        getAllCompanies={()=>requestAllCompanies(user._id)}
                        requestCompany={(id)=>requestCompany(user._id,id)}
                        createCompany={(company)=>{
                          company.uID = user._id;
                          createCompany(user._id,company);
                        }}
                        deleteCompany={(id)=>deleteCompany(user._id,id)}
                        updateCompany={(company)=>{
                          company.uID = user._id;
                          updateCompany(user._id,company);
                        }}
                        searchCompanies={(query)=>searchCompanies(query)}/>
      </div>
    );
  }
}

const mapStateToProps= state =>(
    {
      allCompanies:state.companiesState.allCompanies,
      searchResults:state.companiesState.searchResults,
      company:state.companiesState.company,
      user:state.userState.user
    }
);
export default connect(mapStateToProps)(CompaniesContainer);
