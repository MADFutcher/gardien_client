const axios = require('axios')

class MapService {
    constructor(query){
        let service = axios.create({
            baseURL:'http://api.positionstack.com/v1/',
            params:{access_key:'e41479315c0953fc9b4a55f5f5a1622e', query:query,limit:1}
        })
        this.service = service;
    }


    streetToLatLng = () =>{
        return this.service.get('/forward')
                    .then(response => response.data)
    }

    latLngToStreet = () =>{
        return this.service.get('/reverse')
                    .then(response => response.data)
    }


}

 
export default MapService;