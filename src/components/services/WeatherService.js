const axios = require('axios')

class WeatherService {
    constructor(location){
        let service = axios.create({
            baseURL:'http://api.weatherapi.com/v1/',
            params:{q:location,key:'ec8ea83afaf4413696d120432212002'}
        })
        this.service = service;
    }


    current = () =>{
        return this.service.get('/current.json')
                    .then(response => response.data)
    }
}

 
export default WeatherService;