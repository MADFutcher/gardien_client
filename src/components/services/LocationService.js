import axios from 'axios';
 
class LocationService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:3000/api/users',
      withCredentials: true
    });
    this.service = service;
  }

  getAllLocations = (_id)=>{
    return this.service.get(`/${_id}/locations`)
    .then(response => response.data)
  }

  getSpecificLocation = (_id,locationId) =>{
      return this.service.get(`/${_id}/locations/${locationId}`)
      .then(response => response.data)
  }

  postNewLocation = (_id,newLocation) =>{
    return this.service.post(`/${_id}/locations/newLocation`, newLocation)
    .then(response => response.data)
  }

}

export default LocationService;