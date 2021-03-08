import axios from 'axios';
 
class PlantService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
    this.service = service;
  }

  getAllPlants = (_id)=>{
    return this.service.get(`users/${_id}/plants`)
    .then(response => response.data)
  }

  getSpecificPlant= (_id,plantId) =>{
      return this.service.get(`users/${_id}/plants/${plantId}`)
      .then(response => response.data)
  }

  postNewPlant = (_id, locationId, newPlant) =>{
    return this.service.post(`users/${_id}/locations/${locationId}/plants/new`, newPlant)
    .then(response => response.data)
  }
  
  postUpdatedPlant = (_id, plantId, updatedPlant) =>{
    return this.service.post(`users/${_id}/plants/${plantId}`, updatedPlant)
    .then(response => response.data)
  }

  deletePlant = (_id, plantId)=>{
    return this.service.get(`users/${_id}/plants/${plantId}/delete`)
    .then(response => response.data)
  }


}

export default PlantService;