import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import './mapcomponent.css';
import LockerInfoModal from '../LockerInfoModal/lockerInfoModal';
import axios from 'axios';


const mapStyles = {
  width: '100%',
};

export class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      showModal: false,
      freeLockersLocation:[],
      asset:[],
      isloaded:false,
      currentLatitiude:'',
      currentLongitude:'',
      myLocationLoaded: true,
      currentMarkerId:'',
      isDisabled:false,  
      positionLoaded:false,
      assetfetched:false,
      responsetText:'',
      api:''          
    }
    
    this.displayFreeLockers = this.displayFreeLockers.bind(this);
    this.displayLocationInfo=this.displayLocationInfo.bind(this);
  }
   
  componentDidMount()
  {
    axios.get('staticdata.json').then(response => 
      {
        this.setState({api: response.data})
        const url=this.state.api.freeLockersAPI;
        fetch(url).then(response => response.json())
        .then(response => 
        {
          this.setState({asset:response,isloaded:true})     
        });
      })
        if (navigator.geolocation) 
        {
          navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        }
  }

componentDidUpdate = (prevProps, prevState) => {

 if(prevState.asset!==this.state.asset)
 {
   this.setState({asset:this.state.asset})
 }
}

displayLocationInfo(position) 
{
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;
  this.setState({currentLatitiude:lat,currentLongitude:lng,myLocationLoaded:true});
}


displayFreeLockers = () =>
{
  if(!this.state.isloaded )
    return (<h1>Loading data...</h1>)
    else
    {
      // eslint-disable-next-line
      return this.state.asset.map((element, index1) => {
        if(element.availability>=1)
          return( 
           <Marker
            key={index1} 
            id={index1}
            position={{
            lat: element.lat,
            lng: element.lng,
            }
            }
            label='Free'
            icon='freeLockerIcon.png'
            onClick=
            {() => this.handleToggleModal(element.id)}
            />)
     
          })
   
      }
  }

handleToggleModal(id) 
{
  this.setState({ showModal: !this.state.showModal,currentMarkerId:id });
}

displayUsedLockers = () => 
{
  return this.state.usedLockers.map((store, index) => {
      return <Marker 
      key={index} 
      id={index}
      position={{
      lat: store.lat,
      lng: store.lng,
     }
     }
     label='Used'
     icon='usedLockerIcon.png'
     />
    })
}

displayCurrentLocationMarker=() =>
{
  if(!this.state.myLocationLoaded)
    return (<h1>Loading data...</h1>)
    else
    {
    return <Marker
    position={{
      lat:this.state.currentLatitiude,
      lng:this.state.currentLongitude,
    }} 
    />
  }
}

bookLocker=(e) =>
{
  var markerId=this.state.currentMarkerId;
  //without prevent default, click on parent component(marker) also trigers the function
  e.preventDefault();
  const uniqueId = Math.floor((Math.random() * 100) + 1);
  const location=this.state.asset[markerId-1].location;
  const cost=this.state.asset[markerId-1].cost;
  const lat=this.state.asset[markerId-1].lat;
  const lng=this.state.asset[markerId-1].lng;
  const capacity=this.state.asset[markerId-1].capacity;
  const availability=this.state.asset[markerId-1].availability;
  const image=this.state.asset[markerId-1].image;
  const name=this.state.asset[markerId-1].name;
  const id=this.state.asset[markerId-1].id;
  const status="closed";
  var today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const data={location,cost,lat,lng,capacity,availability,image,name,id,status,date,time,uniqueId};
   
  const options={
    method:'POST',
    headers:
    {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  }
  const url=this.state.api.bookedLockersAPI;
  fetch(url,options)
    .then(response => {
    const statusCode = response.status;
    if(statusCode===400)
      {
        alert('You can book maximum of 4 lockers')
      }
      else
      {
        alert('Locker booked successfully')
      }
    })
    
    .catch(error => {
      console.error(error);
      return { name: "network error", description: "" };
    });
     this.handleToggleModal();
     this.setState({assetfetched:true})
    }
  
  render() 
  {
    const { showModal } = this.state;
    if(!this.state.myLocationLoaded)
      return(<h3>Loading..</h3>)
    else
    {
      var markerId=this.state.currentMarkerId
      return (
        <div className="mapcontainer">
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            center={{ lat:this.state.currentLatitiude, lng:this.state.currentLongitude}}
          >
           {this.displayFreeLockers()}
           {this.displayCurrentLocationMarker()}
          </Map>
          {showModal &&
          <LockerInfoModal onCloseRequest={() => this.handleToggleModal()}>
            <div className="modal-window">
                <div className="lockerImage">
                  <img src={this.state.asset[markerId-1].image} alt="lockerimage" ></img>
                </div>
              <h5>{this.state.asset[markerId-1].location}</h5>  
              <p id="small-text"><small>Available lockers</small></p>
              <p id="availability">{this.state.asset[markerId-1].availability}</p>
              <p id="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button type="button"className="btn btn-success"  id="book" onClick={(e) => {this.bookLocker(e)}}>Book</button> 
            </div>
          </LockerInfoModal>}
        </div>
    );
      }
  }
}
export default GoogleApiWrapper({
  apiKey:'AIzaSyArBnCC8J5ML80NgMJjCKtvyES0oBjEAfY'
})(MapComponent);


