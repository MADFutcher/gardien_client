import React, { Component } from 'react'
import './Main.css'
import Button from 'react-bootstrap/Button';
import AuthService from '../services/AuthService'
import AuthMe from '../services/AuthMe'
import WeatherService from '../services/WeatherService'
import UserService from '../services/UserService';
import LocationService from '../services/LocationService'
import ProcessWeatherForecast from '../processing/weatherForcastProcessing'

import LocationCard from '../cards/LocationCard'
import uuid from 'react-uuid'
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


    checkForWarnings = () =>{
        const weatherService = new WeatherService(`51.571915,4.768323`)
        weatherService.forecast().then(results=>console.log(results))
    }




    getLocations=()=>{
        this.locationService.getAllLocations(this.props.id)
                            .then(results =>{
                                    results.data.locations.forEach(loc=>{
                                        const locationId = loc._id
                                        const plantInfo = loc.plants
                                        const locType = loc.type
                                        const latlng = `${loc.location.coordinates[0]},${loc.location.coordinates[1]}`
                                        let weatherService = new WeatherService(latlng,3)
                                        weatherService.forecast().then(results=>{
                                            let warnings
                                            if(locType==='Outdoor'){
                                                warnings = ProcessWeatherForecast(results.forecast,locationId, plantInfo)
                                            }else{
                                                warnings=[]
                                            }
                                            let prevlocDetails= [...this.state.allLocations]
                                            loc.weatherInfo = results
                                            loc.warnings = warnings
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
                <div className='row'>
                    <div className='text-left p-4 col-6'>
                        <Link to={`/${this.props.id}/locations/newlocation`}><Button variant="outline-primary">New Location</Button></Link>
                    </div>
                    <div className='text-right p-4 col-6'>
                        <Button variant='outline-success' onClick={this.logout}>Logout</Button>
                    </div>
                </div>
                <h1>Welcome {this.props.userData.username}</h1>
                <div className="row mt-5">
                    <div className='col'>
                        {this.state.allLocations.map(el=>{
                            return <LocationCard locationInfo={el} userId={this.props.id} key={uuid()}/>
                        })}
                    </div>        
                </div>
            </div>
        )
    }
}
