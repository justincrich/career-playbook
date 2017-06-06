import * as ActionTypes from '../ActionTypes/companies-actiontypes';
import * as Endpoints from '../endpoints';
import fetch from 'isomorphic-fetch';

//GET ALL COMPANIES
export const requestAllCompanies=(_uid)=>{

  return{
    type: ActionTypes.REQUEST_ALL_COMPANIES,
    isFetching:true,
    userId:_uid
  };
}

export const receiveAllCompanies=(json)=>{
  return{
    type:ActionTypes.RECEIVE_ALL_COMPANIES_SUCCESS,
    isFetching:false,
    allCompanies: json,
    receivedAt:Date.now()
  };
}

//Thunk action handlers
export function fetchAllCompanies(_uid){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestAllCompanies(_uid));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.COMPANIES;
    var init = {method:'GET',mode:'nocors'};
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>

        dispatch(receiveAllCompanies(json))
        // console.log(receiveJob(_cid,json))
      ).catch(error=>console.log("Error in Actions.Companies.fetchAllCompanies(): ",error));

  }
}

//GET ONE COMPANY
export const requestCompany=(_uid,_cid)=>{
  return{
    type: ActionTypes.REQUEST_COMPANY,
    isFetching:true,
    _cid,
    userId:_uid
  };
}

export const receiveCompany=(_cid,json)=>{
  return{
    type:ActionTypes.RECEIVE_COMPANY_SUCCESS,
    isFetching:false,
    _cid,
    job: json,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchCompany(_uid,_cid){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestCompany(_uid,_cid));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.COMPANIES.concat(_cid);
    var init = {method:'GET', mode:'nocors'}
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveCompany(_cid,json))
        // console.log(receiveCompany(_cid,json))
      ).catch(error=>console.log("Error in Actions.Companys.fetchCompany(): ",error));

  }
}








//CREATE COMPANIES

export const requestCreateCompany=(_uid,company)=>{
  return{
    type: ActionTypes.REQUEST_CREATE_COMPANY,
    isFetching:true,
    company:company,
    userId:_uid
  };
}

export const receiveCreateCompany=(company)=>{
  return{
    type:ActionTypes.RECEIVE_CREATE_COMPANY_SUCCESS,
    isFetching:false,
    company: company,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchCreateCompany(_uid,company){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestCreateCompany(_uid,company));
    //Get company
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.COMPANIES;
    var init = {
      method:'POST',
      mode:'nocors',
      body:JSON.stringify(company),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveCreateCompany(json))
      ).catch(error=>console.log(error));

  }
}



//DELETE COMPANY
export const requestDeleteCompany=(_uid,_cid)=>{
  return{
    type: ActionTypes.REQUEST_DELETE_COMPANY,
    isFetching:true,
    _cid:_cid,
    userId:_uid
  };
}

export const receiveDeleteCompany=(companiesRemaining)=>{
  console.log("ACTION REMAINING",companiesRemaining);
  return{
    type:ActionTypes.RECEIVE_DELETE_COMPANY_SUCCESS,
    isFetching:false,
    companiesRemaining: companiesRemaining,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchDeleteCompany(_uid,_cid){
  return function(dispatch){
    console.log("FETCH DELETE",_cid);
    //Update state to inform app we're processing
    dispatch(requestDeleteCompany(_uid,_cid));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.COMPANIES.concat(_cid);
    console.log("URL",url);
    var init = {
      method:'DELETE',
      mode:'nocors',
      // body:JSON.stringify(job),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveDeleteCompany(json))
        // console.log("RESPONSE DELETE",json)
      ).catch(error=>console.log(error));

  }
}
// UPDATE COMPANY FUNCTION
export const requestUpdateCompany=(_uid,company)=>{
  return{
    type: ActionTypes.REQUEST_UPDATE_COMPANY,
    isFetching:true,
    company:company,
    userId:_uid
  };
}

export const receiveUpdateCompany=(company)=>{
  return{
    type:ActionTypes.RECEIVE_UPDATE_COMPANY_SUCCESS,
    isFetching:false,
    company: company,
    receivedAt:Date.now()
  };
}


//Thunk action handlers
export function fetchUpdateCompany(_uid, company){
  return function(dispatch){

    //Update state to inform app we're processing
    dispatch(requestUpdateCompany(_uid,company));
    //Get job
    var useSSL = 'https:' === document.location.protocol;
    var url = (useSSL ? 'https://':'http://')+Endpoints.DOMAIN+Endpoints.USER+_uid+"/"+Endpoints.COMPANIES.concat(company._cid);
    var init = {
      method:'PUT',
      mode:'nocors',
      body:JSON.stringify(company),
      headers: new Headers({
        'Content-Type':'application/json; charset=utf-8',
        'Data-Type':'json'
      })

    }
    var req = new Request(url,init);

    return fetch(req)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveUpdateCompany(json))
      ).catch(error=>console.log(error));

  }
}



export const searchCompanies = (query)=>{
  return{
    type:ActionTypes.SEARCH_COMPANIES,
    query
  };
}
