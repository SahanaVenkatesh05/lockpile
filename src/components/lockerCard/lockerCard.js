import React from 'react';
import '../lockerCard/lockerCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LockerInfoModal from '../LockerInfoModal/lockerInfoModal';
import axios from 'axios'

export default class LockerCard extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {lockerData:'',
    showModal:false,
    api:'',
    released:false,
    currentLocker:'',
    location:this.props.location,
    cost:this.props.cost,
    date:this.props.date,
    time:this.props.time,
    lockerstatus:this.props.status,
    isopen:'Open',
    lockerInfoVisible:false,
    disabled:false,
    id:this.props.id,
    uniqueId:this.props.uniqueId,
    statechanged:false
    }
    this.release = this.release.bind(this);
  }
 componentDidMount()
 {
   axios.get('staticdata.json').then(response=>{
     this.setState({api:response.data})
   })
   if(this.state.status==='open')
   {
     this.setState({disabled:true})
   }
   
 }

 componentWillReceiveProps(nextProps)
 {
  if(nextProps.status==='closed')
  {
    this.setState({disabled:false})
  }
  
 } 

 releaseLocker=(e)=>
 {
    //without prevent default, click on parent component(marker) also trigers the function
    console.log(this.state.lockerstatus)
    if(this.state.lockerstatus==='open')
    {
      console.log("inside if")
      alert("You must close the locker to release")
    }
    else
    {
      console.log("Inside else")
      this.handleToggleModal();
    }
    
}

release=(e)=>
{
  const myurl=this.state.api.releaselockerAPI+''+this.props.uniqueId;
  console.log(myurl)
  fetch(myurl)
  .then(response => {
    this.handleToggleModal();
    window.location.reload() 
  })
}

openLocker=(e)=>
{
  //without prevent default, click on parent component(marker) also trigers the function
  e.stopPropagation();
  const myurl=this.state.api.openLockerAPI+''+this.props.uniqueId;
  console.log(myurl)
  fetch(myurl)
  .then(response => {
   if(response.status===400)
   {
     alert("Operation not allowed")
   } 
   else{
    this.setState({disabled:true})
   }
}) 
}
  
handleToggleModal() 
{
  this.setState({ showModal: !this.state.showModal }); 
}

openLockerInfoWindow(e) 
{
  e.stopPropagation()
  this.setState({ lockerInfoVisible: !this.state.lockerInfoVisible,showModal:true });  
}

cancelRelease=(e)=>
{
  e.preventDefault();
  this.setState({showModal:false})
}
    
render() 
{
  const { showModal } = this.state;  
    return (
      <div>
      <div className="grid-item" onClick={(e) => {
        this.openLockerInfoWindow(e)}}>
          <span id="location" >{this.state.location} </span>
          <br /><br />
          <b>&pound;<span id="cost">{this.state.cost}</span></b>
          <br/><br/>
          <span id="lockeruse">{this.state.use}</span>
          <span >Locker in use since {this.state.date} {this.state.time}</span>
          <br/>
          <button type="button" className="btn btn-success" id="openButton"  disabled={this.state.disabled} onClick={(e) => {
        this.openLocker(e)}}>Open</button>
          &nbsp;&nbsp;
          <button type="button" className="btn btn-primary" id="releaseButton"  onClick={() => this.releaseLocker()}>Release</button>
      </div>

      {showModal &&
          <LockerInfoModal onCloseRequest={() => this.handleToggleModal()}>
            <div className="modal-window">
              <div className="inner-div">
                
             <p id="warning-message">Are you sure you want to release the locker?</p>
             <br />
             <button type="button" className="btn btn-success" id="button1"  onClick={(e) => {this.cancelRelease(e)}}>No</button>
             &nbsp;&nbsp; &nbsp;&nbsp;
             <button type="button" className="btn btn-danger" id="button2" onClick={(e)=>{
               this.release(e)
             }}>Yes</button></div>
              </div>
          </LockerInfoModal>}
      </div>
    );
  }
}
   
  
  