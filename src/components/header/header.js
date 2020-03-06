import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../header/header.css'
import axios from 'axios';
import Sidebar from "react-sidebar";
import App from '../../App';
import {
  BrowserRouter ,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends React.Component {

  constructor(props) 
  {
    super(props);
   
    this.state = {staticData:'',
    sidebarOpen: false,
    isloggedOut:false,
    
  };

  this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  this.logout = this.logout.bind(this);  
  }

  
  onSetSidebarOpen(open) 
  {
    this.setState({ sidebarOpen: open });
  }

  componentDidMount()
  {
    this.getStaticData();
  }
 
  getStaticData()
  {
   axios.get('staticdata.json').then(response => 
   {
     this.setState({staticData: response})
   })
  }

  logout=(e) => 
  {
    console.log("inside logout")
    e.preventDefault();
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    this.props.history.push({pathname:"/",state: {loggedOutstatus: true} });
  }
    
render() 
{
  if (!this.state.staticData)
  return (<p>Loading data</p>)
  if(this.state.sidebarOpen)
  return(

    <div className="sidebar"> 
    <Sidebar 
      sidebar=
      {
      <div>
      <div id="name">{this.props.name}</div>
      <br></br>
      <a href="#" className="anchors">About</a>
      
      <br></br>
      <br></br>
      
      <a href="#" className="anchors">Payment History</a>
      <br></br>
        <button type="button" className="btn btn-info" id="logoutButton"  onClick={(e) => this.logout(e)}>Logout</button> 
      </div>
      }
      open={this.state.sidebarOpen}
      onSetOpen={this.onSetSidebarOpen}
      styles={
        { sidebar: { background: "#f2e6ff", width:"25%",height:"100%" }
       }}
    >
    </Sidebar>
    </div>);

  return (
    <div>
      <BrowserRouter>
        <div id="header">
          <div className="hamburger-menu" onClick={() => this.onSetSidebarOpen(true)} >
            <span></span>  
            <span></span>
            <span></span>
          </div> 
          <div id="title">
            <p>{this.state.staticData.data.apptitle}</p>
          </div>
        <Route exact path="/" component={App}/>   
        </div>
      </BrowserRouter>
    </div>
    );
  }
}
   
  
  