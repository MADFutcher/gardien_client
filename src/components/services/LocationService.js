import axios from 'axios';
 
class LocationService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
    this.service = service;
  }

  getAllLocations = (_id)=>{
    return this.service.get(`users/${_id}/locations`)
    .then(response => response.data)
  }

  getSpecificLocation = (_id,locationId) =>{
      return this.service.get(`users/${_id}/locations/${locationId}`)
      .then(response => response.data)
  }

  postNewLocation = (_id,newLocation) =>{
    return this.service.post(`users/${_id}/locations/newLocation`, newLocation)
    .then(response => response.data)
  }

  postUpdateLocation = (_id, locationId, locationData)=>{
    return this.service.post(`users/${_id}/locations/${locationId}`, locationData)
    .then(response => response.data)
  }

}

export default LocationService;