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

        return this.service.post('/external/streetLatLng',{address:address})
                    .then(response => response.data)
    }

    latLngToStreet = (lat,lng) =>{
        return this.service.get('/external/latlngStreet',{lat:lat, lng:lng})
                    .then(response => response.data)
    }


}

 
export default MapService;