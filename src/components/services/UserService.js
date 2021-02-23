import axios from 'axios';
 
class UserService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:3000/api/users',
      withCredentials: true
    });
    this.service = service;
  }

  user = (_id)=>{
    return this.service.get(`/${_id}`)
    .then(response => response.data)
  }

  userLocations = (_id) =>{
      return this.service.get(`/${_id}/locations`)
      .then(response => response.data)
  }

}

export default UserService;