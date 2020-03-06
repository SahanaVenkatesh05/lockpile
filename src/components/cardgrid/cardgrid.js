import React from 'react';
import '../cardgrid/cardgrid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LockerCard from '../lockerCard/lockerCard'
import FreeToBook from '../FreeToBook/free';
import axios from 'axios';
import Version from '../../version/version';

export default class CardGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { asset:[],isloaded:false,released:false
    }
    this.handleRelease = this.handleRelease.bind(this);
  }

  componentDidMount() 
  {
    axios.get('staticdata.json').then(response => 
      {
        this.setState({api: response.data})
        const url=this.state.api.bookedLockersAPI;    
        fetch(url).then(response => response.json())
        .then(response => {
        this.setState({asset:response,isloaded:true})      
  });
      setInterval(()=> this.getStatus(), 5000);
      })
  }
   
  getStatus=()=>
  {
    const url=this.state.api.lockerstatusAPI
    fetch(url).then(response => response.json())
    .then(response => {
      this.setState({asset:response})     
     
    });
  }

  handleRelease=()=>
  {
    this.setState({released:true})
  }
   
    render() 
  {
    if(!this.state.isloaded)
      return(<div>loading...</div>)
    if(this.state.asset.length===3)
    return (
    <div className="grid-container">
      {this.state.asset.map(locker => (
          <LockerCard
            id={locker.id}
            uniqueId={locker.uniqueId}
            location={locker.location}
            cost={locker.cost}
            status={locker.status}
            date={locker.date}
            time={locker.time}
            image={locker.image}
            release={this.handleRelease}
          />
        ))}
     <FreeToBook />
    </div>
    );
    if(this.state.asset.length===2)
    return (
    <div className="grid-container">
      {this.state.asset.map(locker => (
          <LockerCard
            id={locker.id}
            uniqueId={locker.uniqueId}
            location={locker.location}
            cost={locker.cost}
            status={locker.status}
            date={locker.date}
            time={locker.time}
            image={locker.image}
            release={this.handleRelease}
          />
        ))}
     <FreeToBook />
     <FreeToBook />
    </div>
    );
    if(this.state.asset.length===1)
    return (
    <div className="grid-container">
      {this.state.asset.map(locker => (
          <LockerCard
            id={locker.id}
            uniqueId={locker.uniqueId}
            location={locker.location}
            cost={locker.cost}
            status={locker.status}
            date={locker.date}
            time={locker.time}
            image={locker.image}
            release={this.handleRelease}
          />
        ))}
     <FreeToBook />
     <FreeToBook />
     <FreeToBook />
    </div>
    );
    if(this.state.asset.length===4)
    return (
    <div className="grid-container">
      {this.state.asset.map(locker => (
          <LockerCard
            id={locker.id}
            uniqueId={locker.uniqueId}
            location={locker.location}
            cost={locker.cost}
            status={locker.status}
            date={locker.date}
            time={locker.time}
            image={locker.image}
            release={this.handleRelease}
          />
        ))}
    </div>
    );
    if(this.state.asset.length===0)
    return (
    <div className="grid-container">
     <FreeToBook />
     <FreeToBook />
     <FreeToBook />
     <FreeToBook />
    </div>
    );
   
    
  }
 
}
