import axios from 'axios';
 
class UserService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
    this.service = service;
  }

  user = (_id)=>{
    return this.service.get(`users/${_id}`)
    .then(response => response.data)
  }

  userLocations = (_id) =>{
      return this.service.get(`users/${_id}/locations`)
      .then(response => response.data)
  }

}

export default UserService;