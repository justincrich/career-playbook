// REACT
import React, { Component } from 'react';

// VIEWS
import CompaniesGroup from '../Views/CompaniesGroup';

//REDUX HANDLERS
import * as Actions from '../../Actions/companies';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

//CSS
import '../../../css/template.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class CompaniesContainer extends Component{
  render(){
    // Redux variables and methods
    const {dispatch, allCompanies, searchResults,company}=this.props;
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
                        getAllCompanies={()=>requestAllCompanies()}
                        requestCompany={(id)=>requestCompany(id)}
                        createCompany={(company)=>createCompany(company)}
                        deleteCompany={(company)=>deleteCompany(company)}
                        updateCompany={(company)=>updateCompany(company)}
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
    }
);
export default connect(mapStateToProps)(CompaniesContainer);
