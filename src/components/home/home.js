import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardGrid from '../cardgrid/cardgrid';
import MapComponent from '../map/mapcomponent';
import Header from '../header/header';
import App from '../../App';
import Version from '../../version/version';
import FreeToBook from '../FreeToBook/free';
import './home.css'


export default class Home extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      isloggedIn: this.props.location.state.loginstatus,
      isloggedOut:this.props.location.state.loggedOutstatus,
      userName:this.props.location.state.loggedinuser,
      userid:this.props.location.state.userId
    };
    
  }
  componentDidMount()
  {
    function preventBack(){
    window.history.forward();}
    setTimeout(preventBack(), 0);
    window.onunload=function(){};
  }
  
  render() 
  {
   
    if(!this.state.isloggedIn || this.state.isloggedOut)
     { 
    
     return(<div> <App /></div>)
    }
    else
    {
   
    return(       
      <div>
        <div className="home">
          <Header history= {this.props.history} name={this.state.userName} userId={this.state.userid} />
          <MapComponent history= {this.props.history}  />
          <CardGrid />
          <Version />
        </div> 
       
      </div>
  );
    }
}
}
