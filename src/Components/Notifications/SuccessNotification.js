import React, {Component} from 'react';
import Radium from 'radium';


const styles = {
  error:{
    position:"fixed",
    zIndex:"100",
    width: "100%",
    // left:"12.5%",
    top:"50px"

  }
};

class SuccessNotification extends Component {
  constructor(props){
    super(props);
    this.state={
      delay:3000,
      visible:false
    };
    this.show.bind(this);
  }

  show(){
    setTimeout(()=>{
      this.props.dismiss();
    }
    ,3000);
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> {this.props.message}
      </div>
    );
  }

  render(){
    return (
      <div style={styles.error} >
        {this.props.visible == true &&
          this.show()
        }
      </div>
    );
  }

}









//Styles


export default Radium(SuccessNotification);
