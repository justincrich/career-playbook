import React, {Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import reactCSS from 'reactcss';
import defaultIMG from './company.jpg';
import Company from './Company';
import CompanyAddModal from '../ModalViews/CompanyAddModal';

//CSS
import '../../../css/template.css';

// More CSS Stuffs
const styles = reactCSS({
  'default':{
    addButton:{
      height:"42px",
    }

  }
});

class CompaniesGroup extends Component{
  constructor(props){
    super(props);
    this.state={
      addModal:false,
      detailsModal:false,
      query:"",
      loadingAll:false,
      loadingOne:false
    };
    this.closeModal.bind(this);
    this.openModal.bind(this);
    this.detailsView.bind(this);
    this.handleInput.bind(this);
    this.listCompanies.bind(this);

  }

  componentWillMount(){
    this.props.getAllCompanies();
  }

  openModal(){
    console.log("OPEN");
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

  }

  listCompanies(arr){
    return arr.map((company,index)=>(
      <Company
        key={index}
        company={company}
        index={index}
        create={this.createCompany}
        delete={this.props.deleteCompany}
      />
    ));

  }

  handleInput(event){
    this.setState({query:event.target.value});
  }

  componentWillUpdate(nextProps, nextState){
    if(this.state.query!==nextState.query){
      this.props.onSearch(nextState.query);
    }
  }

  render(){
      return(
            <div className="container ">
              <div className="d-flex flex-row align-center w-100 mb-2">
                  <div className="input-group">
                    <span className="input-group-addon" id="job-search" onClick={()=>this.search()} ><i className="material-icons">search</i></span>
                    <input type="search" onChange={(event)=>this.handleInput(event)} className="form-control" placeholder="Search" aria-describedby="sizing-addon2"/>
                  </div>

                <div className="ml-3">
                  <button type="button" style={styles.addButton} className="btn btn-secondary py-2" onClick={()=>this.openModal()}><i className="material-icons">add</i></button>
                </div>
              </div>

                {this.props.companies.isFetching ?
                  console.log("Companies Loading:",this.props.companies.isFetching)
                  :
                  this.listCompanies(this.props.companies.records)
                }
                <CompanyAddModal close={()=>this.closeModal()} modalState={this.state.addModal} save={this.props.createCompany} allCompanies={this.props.companies} />
          </div>

      );
  }


}



export default CompaniesGroup;
