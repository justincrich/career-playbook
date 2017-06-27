import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Radium from 'radium';
import * as Template from '../../Styles/template';
import Popover from './Popover/Popover';
class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      styles:{
        hBrand:{
          font: Template.fonts.headline,
          color: Template.colors.primaryTextColorLight
        },
        hBrand:{
          '@media (max-width:991px)':{
            margin:"0 auto"
          }
        },
        hLineItem:{
          font: Template.fonts.subheading,
          color: Template.colors.primaryTextColorLight,
          ":hover":{
            background:Template.colors.primaryColorDark
          }
        },
        image:{
          container:{
            padding: 'auto 3px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',

            position:'relative',
            flexDirection:'column',

          },
          imageCover:{
            cursor:"pointer",
            borderRadius:'100%',
            width:'55px',
            height:'55px',
            overflow:'hidden',
            border:"3px solid "+Template.colors.primaryColor,
            ":hover":{
              border:"3px solid "+Template.colors.primaryColorDark,

            }
          },
          asset:{

          }
        },
        actionContainer:{
          height:"100%",
          width:'125px'
        }
        ,
        smLogout:{
          cursor:"pointer",
          color: Template.colors.primaryTextColorLight,
        },
        primeNavContainer:{
          height:"62px",
          width:"100%",
          padding:"0 16px"

        },
        bodyStyle:{
          background:Template.colors.primaryColor, //Background Blue Grey
          padding:"0",
          marginBottom:"10px",
          position:"fixed",
          top:0,
          width:"100%",
          height:"auto",
          zIndex:"1000",
          display:"flex",
          flexDirection:"column",

        },
        hamburger:{
          cursor:"pointer",
          position:"fixed"
        },
        smMenu:{
          background:Template.colors.primaryColor,
          position:"fixed",
          flexDirection:"column",
          top:"62px",
          height:0,
          maxHeight:0,
          overflow:'hidden',
          width:'100%',
          transition:"max-height .5s ease-in"
        },
        smUL:{
          padding:'0',
          listStyleType:'none',
          display:"flex",
          flexDirection:"column",
          width:'100%'
        },
        smLI:{
          padding:"8px 16px",
          width:"100%",
          display:'flex',
          flexDirection: 'row',
          ":hover":{
            background:Template.colors.primaryColorDark
          }
        },
        smLink:{
          textDecoration:'none',
          color:Template.colors.primaryTextColorLight
        },
        smText:{},

      },
      menuClosed:true,
      accountMenuActive:false
    }
    this.openMenu.bind(this);
    this.openAccountMenu.bind(this);
  }


  openMenu(){

    this.setState(prevState=>({
      menuClosed:!prevState.menuClosed
    }));
    if(this.state.menuClosed){
      this.setState(prevState=>({
        styles:{
          ...prevState.styles,
          smMenu:{
            ...prevState.styles.smMenu,
            height:'auto',
            maxHeight:'500px',
          }
        }
      }));
    }else{
      this.setState(prevState=>({
        styles:{
          ...prevState.styles,
          smMenu:{
            ...prevState.styles.smMenu,
            height:'auto',
            maxHeight:'0',
          }

        }
      }));
    }
  }


  openAccountMenu(){
    this.setState(prevState=>({
      accountMenuActive:!prevState.accountMenuActive
    }));
  }






  render(){
    return (
      <nav  style={this.state.styles.bodyStyle} className="navbar navbar-toggleable-md navbar-inverse bg-faded">
        <div style={this.state.styles.primeNavContainer} className="primeNavContainer d-flex flex-row">
          {this.props.user != undefined &&
            <button style={this.state.styles.hamburger} onClick={()=>this.openMenu()} className="navbar-toggler navbar-toggler align-self-center"  type="button" data-toggle="collapse" >
              <span className="navbar-toggler-icon" ></span>
            </button>
          }
          <div style={this.state.styles.hBrand} className="navbar-brand d-flex flex-column align-self-center">Playbook</div>
              <div className=" collapse navbar-collapse h-100 " id="navbarNav">
                {this.props.user != undefined &&
                  <div className="d-flex flex-row w-100">
                    <ul className="navbar-nav mr-auto h-100 ">
                      <li key={1} style={this.state.styles.hLineItem} className="nav-item d-flex align-items-center">
                        <NavLink className="nav-link h-100 py-auto d-flex" to="/jobs"><div className="align-self-center navLinkText ">Jobs</div></NavLink>
                      </li>
                      <li key={2} style={this.state.styles.hLineItem} className="nav-item h-100 d-flex align-items-center">
                        <NavLink  className="nav-link h-100 d-flex" to="/companies"><div className="navLinkText align-self-center">Companies</div></NavLink>
                      </li>
                    </ul>
                    {/* <div key={3} style={this.state.styles.hLineItem} onClick={()=>this.props.logout()} className="h-100 d-flex align-items-center px-2">
                      <a className="navLinkText">Logout</a>
                    </div> */}
                    <div style={this.state.styles.actionContainer} className="actionContainer">
                      <div key={4} style={this.state.styles.image.container} >
                        <div key={4} style={this.state.styles.image.imageCover} className="profileImage" onClick={()=>this.openAccountMenu()}>
                          <img style={this.state.styles.image.asset} src={this.props.user.photo}></img>
                        </div>
                      </div>
                      {this.state.accountMenuActive &&

                        <Popover logout={this.props.logout} toggle={()=>this.openAccountMenu()}/>

                      }
                    </div>
                  </div>
                }
            </div>
        </div>
        {this.props.user != undefined &&
          <div style={this.state.styles.smMenu} className="smMenu">
            <ul style={this.state.styles.smUL} className="smallNavUL">
              <li key="a"  style={this.state.styles.smLI} className="smallNavLI">
                <NavLink style={this.state.styles.smLink} className="smNavLink" to="/jobs"><div className="smNavLinkTex">Jobs</div></NavLink>
              </li>
              <li key="b"  style={this.state.styles.smLI} className="smallNavLI">
                <NavLink  style={this.state.styles.smLink} className=" " to="/companies"><div style={this.state.styles.smText} className="smNavLinkTex">Companies</div></NavLink>
              </li>
              <li key="c"  style={this.state.styles.smLI} className="smallNavLI">
                <a style={this.state.styles.smLogout} onClick={()=>this.props.logout()} >Profile</a>
              </li>
              <li key="d"  style={this.state.styles.smLI} className="smallNavLI">
                <a style={this.state.styles.smLogout} onClick={()=>this.props.logout()} >Logout</a>
              </li>
            </ul>
          </div>
        }

      </nav>
    );
  }
}



export default Radium(Header);
