import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Radium from 'radium';
import defaultIMG from './company.jpg';
import Company from './Company';
import CompanyAddModal from '../ModalViews/CompanyAddModal';
import * as Template from '../../Styles/template';

//CSS
import '../../../css/template.css';



class CompaniesGroup extends Component{
  constructor(props){
    super(props);
    this.state={
      addModal:false,
      detailsModal:false,
      query:"",
      loadingAll:false,
      loadingOne:false,
      styles:{
        body:{
          marginTop:'92px',
          position:'relative',
          zIndex:0,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          height:'100%'
        },
        addButton:{
          height:"42px",
        },
        cardContainer:{
          marginTop:"92px"
        }
      }
    };
    this.closeModal.bind(this);
    this.openModal.bind(this);
    this.detailsView.bind(this);
    this.handleInput.bind(this);
    this.listCompanies.bind(this);
    this.delete.bind(this);

  }

  componentWillMount(){
    this.props.getAllCompanies();
  }

  openModal(){
      this.setState({
        addModal:true,
      });
  }

  closeModal(){
    this.setState({
      addModal:false,
    });
  }

  detailsView(id){

  }

  delete(company){
    this.props.deleteCompany(company);
  }

  listCompanies(arr){
    return arr.map((company,index)=>(
      <Company
        key={index}
        company={company}
        index={index}
        create={this.props.createCompany}
        delete={this.props.deleteCompany}
      />
    ));

  }

  handleInput(event){
    this.setState({query:event.target.value});
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.query!==nextState.query){
      this.props.searchCompanies(nextState.query);
    }
  }

  render(){
    let list = null;
    if(this.props.companies.isFetching == false){
      if(this.state.query.length>0){
        list = this.listCompanies(this.props.searchResults);
      }else{
        list = this.listCompanies(this.props.companies.records);
      }
    }else{
      list = <div>Loading</div>;
    }
      return(
        <div className="companiesBody">
          <CompanyAddModal close={()=>this.closeModal()} user={this.props.user} modalState={this.state.addModal} save={this.props.createCompany} allCompanies={this.props.companies} />
          <div style={this.state.styles.cardContainer} className="cardContainer container">
            <div  className="card">
              <div className="card-header d-flex flex-row align-center w-100 mb-2">
                <h5 className="align-self-center">Companies</h5>
                <div className="ml-auto">
                  <button type="button" style={this.state.styles.addButton} className="btn btn-secondary py-2" onClick={()=>this.openModal()}><i className="material-icons">add</i></button>
                </div>
              </div>
              <div className="card-block">

                {list}
              </div>
            </div>
          </div>
        </div>



      );
  }


}



export default Radium(CompaniesGroup);
