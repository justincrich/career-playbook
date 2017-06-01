import * as CompaniesActionTypes from '../ActionTypes/companies-actiontypes';
import Fuse from 'fuse.js';

const initialState = {
  allCompanies:{
    isFetching:false,
    reqestID:-1,
    lastUpdated:-1,
    records:[
      {
          // _id:1,
          // gdID:-1,
          // name:"Google",
          // logo:""
          // website:"google.com",
          // overallRating:"",
          // ratingDescription:"",
          // industry:"internet"
      }
    ]
  },
  searchResults:[

  ],
  company:{
      isFetching:false,
      reqestID:-1,
      lastUpdated:-1,
      item:{
        // _id:-1,
        // title:"blank",
        // companyName:"blank",
        // companyID:-1,
        // url:"blank",
        // notes:"blank"
      }
  }

};




function CompaniesReducer(state=initialState,action){

  switch(action.type){
    // REQUEST ONE JOB
    case CompaniesActionTypes.REQUEST_COMPANY:{
      var reqCompany={
        isFetching:action.isFetching,
        reqestID:action._id,
        lastUpdated:state.company.lastUpdated,
        item:state.company.item
      }
        return {
          ...state,company:reqCompany
        }
    }
    case CompaniesActionTypes.RECEIVE_COMPANY_SUCCESS:{

      var receiveCompany={
        isFetching:action.isFetching,
        reqestID:action._id,
        lastUpdated:action.receivedAt,
        item:action.company
      }
        return {
          ...state,company:receiveCompany
        }
    }
    // GET ALL JOBS
    case CompaniesActionTypes.REQUEST_ALL_COMPANIES:{
      var reqAllCompanies={
        isFetching:action.isFetching,
        lastUpdated:state.allCompanies.lastUpdated,
        records:state.allCompanies.records
      }
        return {
          ...state,allCompanies:reqAllCompanies
        }
    }
    case CompaniesActionTypes.RECEIVE_ALL_COMPANIES_SUCCESS:{

      var resAllCompanies={
        isFetching:action.isFetching,
        lastUpdated:action.receivedAt,
        records:action.allCompanies,
        receivedAt:action.receivedAt
      }
        return {
          ...state,allCompanies:resAllCompanies
        }
    }
    // SEARCH CURRENT LIST OF JOBS
    case CompaniesActionTypes.SEARCH_COMPANY:{
      var options={
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys:[
          "name"
        ]
      };

      var fuse = new Fuse(state.allCompanies.records,options);

      state.searchResults=fuse.search(action.query);
      return{
        ...state
      };
    }
    // CREATE COMPANY
    case CompaniesActionTypes.REQUEST_CREATE_COMPANY:{
      var reqCompany={
        isFetching:action.isFetching,
        reqestID:0,
        lastUpdated:0,
        item:action.company
      }
        return {
          ...state,company:reqCompany
        }
    }
    case CompaniesActionTypes.RECEIVE_CREATE_COMPANY_SUCCESS:{

      var recCompany={
        isFetching:action.isFetching,
        reqestID:action.company._id,
        lastUpdated:action.receivedAt,
        item:action.company
      }
      var arr = state.allCompanies.records;
      arr.push(action.company);

      return {
        ...state,company:recCompany,allCompanies:{
          isFetching:false,
          reqestID:-1,
          lastUpdated:action.receivedAt,
          records:arr
        }
      }
    }
    // UPDATE JOB
    case CompaniesActionTypes.REQUEST_UPDATE_COMPANY:{
      var reqCompany={
        isFetching:action.isFetching,
        reqestID:action.company._id,
        lastUpdated:0,
        item:action.company
      }
        return {
          ...state,company:reqCompany
        }
    }
    case CompaniesActionTypes.RECEIVE_UPDATE_COMPANY_SUCCESS:{
      var recJob={
        isFetching:action.isFetching,
        reqestID:action.company._id,
        lastUpdated:action.receivedAt,
        item:action.company
      }
      var arr = state.allCompanies.records;
          for(var i = 0; i<arr.length;i++){
            if(arr[i]._id===action.company._id){
              arr = [...arr.slice(0,i),action.company,...arr.slice(i+1)];
            }
          }
        var listUpdate = {
          isFetching:false,
          reqestID:-1,
          lastUpdated:action.receivedAt,
          records:arr
        };

      return {
        ...state,company:recJob,allCompanies:listUpdate
      }
    }
    case CompaniesActionTypes.REQUEST_DELETE_COMPANY:{
      var reqCompany={
        isFetching:action.isFetching,
        reqestID:action._id,
        lastUpdated:0,
        item:{}
      }
        return {
          ...state,company:reqCompany
        }
    }
    case CompaniesActionTypes.RECEIVE_DELETE_COMPANY_SUCCESS:{
      console.log("REMAINING REMAINING",action.companiesRemaining);
      var recCompany={
        isFetching:action.isFetching,
        reqestID:state.company.requestID,
        lastUpdated:action.receivedAt,
      }

      return {
        ...state,company:recCompany,allCompanies:{
          isFetching:false,
          reqestID:-1,
          lastUpdated:action.receivedAt,
          records:action.companiesRemaining
        }
      }
    }
    default:
      return state;
  }


}

export default CompaniesReducer;
