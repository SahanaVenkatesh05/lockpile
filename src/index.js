import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../src/App';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from './components/home/home';


export default class MyApp extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {loggedIn:true}
  }
 
    render() {
      return (   
        <Router>
          <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/home" component={Home}/>
         
          </Switch>
        </Router>
      );
    }
}
    if ('serviceWorker' in navigator) {
     window.addEventListener('load', function() {
       navigator.serviceWorker.register('sw.js').then(function(registration) {
         // Registration was successful
         console.log('ServiceWorker registration successful with scope: ', registration.scope);
       }, function(err) {
         // registration failed :(
         console.log('ServiceWorker registration failed: ', err);
       });
     });
   }

  ReactDOM.render(<MyApp />,document.getElementById('root'));
  