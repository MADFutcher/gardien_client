import React, { Component } from 'react'
import LocationService from '../services/LocationService'


export default class Location extends Component {
    constructor(props){
        super(props)
        this.state={
            location:{}
        }
    }
    
    locationService = new LocationService()
    
    componentDidMount(){
        const userId = this.props.match.params.userId
        const locationId = this.props.match.params.locationId
        this.locationService.getSpecificLocation(userId, locationId)
                            .then(location => console.log(location))
    }

    render() {
        console.log(this.props.match.params.locationId)
        return (
            <div>
                <h1>LOCATION!</h1>            
            </div>
        )
    }
}
