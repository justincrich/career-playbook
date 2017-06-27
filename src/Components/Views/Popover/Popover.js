import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import * as Template from '../../../Styles/template';

class Popover extends Component{
  constructor(props){
    super(props);
    this.state={
      styles:{
        body:{
          position:'relative',
          display:'fixed',
          justifyContent:'center',
          width:'125px',
        },
        arrowOutter:{
          position:'absolute',
          top:-10,
          width:0,
          height:0,
          left:'50%',
          transform: 'translate(-50%, 0)',
          borderLeft:"10px solid transparent",
          borderRight:'10px solid transparent',
          borderBottom:'10px solid #CCCCCC'
        },
        arrowInner:{
          position:'absolute',
          top:-9,
          width:0,
          height:0,
          left:'50%',
          transform: 'translate(-50%, 0)',
          borderLeft:"9px solid transparent",
          borderRight:'9px solid transparent',
          borderBottom:'9px solid #FFF'
        },
        options:{
          icon:{
            marginRight:'5px'
          },
          links:{
            cursor:'pointer',
            ':hover':{
              color: Template.colors.primaryTextColorFaded
            }
          },
          popoverContent:{
            display:'fixed',
            alignItems:'center',
            justifyContent:'center',
            width:'100%'
          }
        },
        clearPopover:{
          position:'fixed',
          width:'100%',
          height:'100%',
          top:0,
          left:0
        }
      }
    }
    this.clearPopover.bind(this);

  }
  componentDidMount(){
    document.addEventListener('click', this.clearPopover.bind(this), true);

  }
  componentWillUnmount(){
    document.addEventListener('click', this.clearPopover.bind(this), true);
  }

  clearPopover(){
    const node = ReactDOM.findDOMNode(this);
    const img = ReactDOM.findDOMNode(node.parentNode.getElementsByClassName('profileImage')[0]);


    if ((!node || !node.contains(event.target) && !img.contains(event.target))) {
        this.props.toggle();
    }
  }

  render(){

    return (


        <div style={this.state.styles.body} className="popover" role="tooltip">
          <div style={this.state.styles.arrowOutter} className="popover-arrow">
          </div>
          <div style={this.state.styles.arrowInner}>
          </div>
          <div style={this.state.styles.popoverContent} className="popover-content">
              {/* <div key="a" style={this.state.styles.options.links}><i style={this.state.styles.options.icon} className="fa fa-user fa-lg" aria-hidden="true"></i> Profile</div> */}
              <div key="b" style={this.state.styles.options.links} onClick={()=>this.props.logout()}><i style={this.state.styles.options.icon} className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
              Logout</div>
          </div>
        </div>


    );
  }

}

export default Radium(Popover);
