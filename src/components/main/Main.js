import React, { Component } from 'react'
import './Main.css'
import Button from 'react-bootstrap/Button';
import AuthService from '../services/AuthService'
import AuthMe from '../services/AuthMe'
import WeatherService from '../services/WeatherService'
import UserService from '../services/UserService';
import LocationService from '../services/LocationService'
// import MapService from '../services/MapService'
import LocationCard from '../cards/LocationCard'
import { Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state={
            weatherDetails:[],
            allLocations:[],
        }
    }

    service = new AuthService()
    userService = new UserService()
    locationService = new LocationService()

    logout = (e) =>{
        this.service.logout().then(()=>{
            AuthMe.logout(()=>{
                localStorage.clear()
                this.props.history.push('/')
            })
        }, err=>{console.log(err)})
    };


    getWeather =()=>{
        let dt = new Date()
        let today = dt.toLocaleString('en-GB').replace(',',' ')
        this.setState({
            weatherDetails:[],
            today
        })
        this.userService.userLocations(this.props.id)
        .then(results=>{
            results.data.locations.forEach(loc=>{
                let weatherService = new WeatherService(`${loc.location.coordinates[0]},${loc.location.coordinates[1]}`)
                weatherService.current().then(results=>{
                    let prevWeatherInfo = [...this.state.weatherDetails]
                    prevWeatherInfo.push(results)
                    this.setState({
                        weatherDetails: prevWeatherInfo
                    })

                })
            })
        })
        
    }


    getLocations=()=>{
        this.locationService.getAllLocations(this.props.id)
                            .then(results =>{
                                    results.data.locations.forEach(loc=>{
                                        const latlng = `${loc.location.coordinates[0]},${loc.location.coordinates[1]}`
                                        let weatherService = new WeatherService(latlng)
                                        weatherService.current().then(results=>{
                                            let prevlocDetails= [...this.state.allLocations]
                                            loc.weatherInfo = results
                                            prevlocDetails.push(loc)
                                            this.setState({
                                                allLocations: prevlocDetails
                                            })
                                        })
                                    })
                                }, err=>console.log(err))
    }

    componentDidMount(){
        // this.getWeather()
        this.getLocations()
        
        // let test =  new MapService('Tuinzigtlaan 138, Tuinzigt, Breda, 4184JE')
        // test.streetToLatLng().then(results => console.log(results))
    }

    render() {
        return (
            <div className="container-fluid">
                <div className='text-right p-4'>
                    <Button className='btn btn-success' onClick={this.logout}>Logout</Button>
                </div>
                <h1>Welcome {this.props.userData.username}</h1>
                <div className="row mt-5">
                    <div className='col'>
                        <h4>Locations</h4>
                        {this.state.allLocations.map(el=>{
                            return <LocationCard locationInfo={el} userId={this.props.id} key={el._id}/>
                        })}
                    </div>        
                </div>
            
                    
                
            </div>
        )
    }
}
