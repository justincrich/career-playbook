import React, {Component} from 'react';
import Radium from 'radium';


const styles = {
  error:{
    position:"fixed",
    zIndex:"100",
    width: "100%",
    top:"50px"

  }
};

class ErrNotification extends Component {
  constructor(props){
    super(props);
    this.state={
      delay:1000,
      visible:false
    };
    this.showErr.bind(this);
  }

  showErr(){
    setTimeout(()=>{
      this.props.dismiss();
    }
    ,3000);
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {this.props.message}
      </div>
    );
  }

  render(){
    return (
      <div style={styles.error} >
        {this.props.visible == 1 &&
          this.showErr()
        }
      </div>
    );
  }

}









//Styles


export default Radium(ErrNotification);
