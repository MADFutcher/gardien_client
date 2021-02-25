import axios from 'axios';
 
class PlantService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:3000/api/users',
      withCredentials: true
    });
    this.service = service;
  }

  getAllPlants = (_id)=>{
    return this.service.get(`/${_id}/plants`)
    .then(response => response.data)
  }

  getSpecificPlant= (_id,plantId) =>{
      return this.service.get(`/${_id}/plants/${plantId}`)
      .then(response => response.data)
  }

  postNewPlant = (_id, locationId, newPlant) =>{
    console.log(_id, locationId, newPlant)
    return this.service.post(`/${_id}/locations/${locationId}/plants/new`, newPlant)
    .then(response => response.data)
  }

}

export default PlantService;