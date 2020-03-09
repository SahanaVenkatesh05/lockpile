import React from 'react';
import './App.css';
import { gapi } from 'gapi-script';
import { BrowserRouter } from 'react-router-dom'
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron,Container} from 'reactstrap';
import Logo from '../src/assets/new.png'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
export default class App extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
    isSignedIn: false,
    username:'',
    profileId:''};
    this.onSuccess = this.onSuccess.bind(this);
  }
  
  onSuccess = (googleUser) => 
  {
    var profile = googleUser.getBasicProfile();
    var user_name = profile.getName(); 
    var id=profile.getId();
   
    this.setState(state => ({
      isSignedIn: !state.isSignedIn,
      username:user_name,
      profileId:id
    }));
   
    function preventBack()
    {
      console.log("Inside prevent back")
      window.history.forward();
    }
      setTimeout(preventBack(), 0);
      window.onunload=function(){};
    
    this.props.history.push({pathname:"/home" ,state: {loginstatus: this.state.isSignedIn,loggedinuser:this.state.username,userId:this.state.profileId}}); 
  };

  componentDidMount() 
  {
     window.gapi.load('auth2', () => {
     window.gapi.auth2.init({
     client_id: '463973580328-nsu48d5p0p55513npcvgukdnpi9plg5h.apps.googleusercontent.com',
     scope: 'profile'
     }).then(() => {
       gapi.signin2.render('loginButton', {
         'width': 200,
         'height': 50,
         'longtitle': true,
         'theme': 'dark',
         'onsuccess': this.onSuccess
    });  
     })
    
   })
  //this.props.history.push({pathname:"/home" ,state: {loginstatus: true,loggedinuser:"Welcome"}}); 
  }

  render() 
  {
    return (    
      <BrowserRouter>
          <center>
            <div  className="myapp" >
              <Jumbotron fluid>
                <Container fluid>
                  <img src={Logo} alt="" />
                  <br />
                   <p id="welcome"  >Sign In to Lockpile</p>
                  <div>
                    <div id="loginButton" >Login with Google</div>
                   </div>
                  </Container>
                </Jumbotron>
              </div>
            </center>
        <Router> 
          <Route exact path="/home" component={Home} history= {this.props.history}/>
        </Router>
        </BrowserRouter>
      );
    }
}

