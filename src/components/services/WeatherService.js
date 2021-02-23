const axios = require('axios')

class WeatherService {
    constructor(location,days){
        let params
        if(days){
            params={q:location,key:'ec8ea83afaf4413696d120432212002',days:days}
        }else{
            params={q:location,key:'ec8ea83afaf4413696d120432212002'}
        }
        let service = axios.create({
            baseURL:'http://api.weatherapi.com/v1/',
            params
        })
        this.service = service;
    }


    current = () =>{
        return this.service.get('/current.json')
                    .then(response => response.data)
    }

    forecast=()=>{
        return this.service.get('/forecast.json')
                    .then(response => response.data)
    }
}

 
export default WeatherService;