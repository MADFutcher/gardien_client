const axios = require('axios')

class MapService {
    constructor(query){
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
          });
          this.service = service;
    }


    streetToLatLng = (address) =>{
        console.log('Class Addres:', address)
        return this.service.post('/external/streetLatLng',{address:address})
                    .then(response => response.data)
    }

    latLngToStreet = () =>{
        return this.service.get('/reverse')
                    .then(response => response.data)
    }


}

 
export default MapService;