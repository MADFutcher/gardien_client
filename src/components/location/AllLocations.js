import React, { Component } from 'react'
import LocationService from '../services/LocationService'
import LocationCard from '../cards/LocationCard'

export default class AllLocations extends Component {
    constructor(props){
        super(props)
        this.state={
            allLocations:[]
        }
    }
    
    locationService = new LocationService()
  
    componentDidMount(){
        this.locationService.getAllLocations(this.props.id)
                       .then(results =>{
                            let prevlocDetails= [...this.state.allLocations]
                            results.data.locations.forEach(loc=>{
                                prevlocDetails.push(loc)
                            })
                            console.log(prevlocDetails)
                            this.setState({
                                allLocations:prevlocDetails
                            })
                       }, err=>console.log(err))
    }
    

    render() {
        return (
            <div>
                {this.state.allLocations.map(el=>{
                    return <LocationCard locationInfo={el} userId={this.props._id} />
                })}
            </div>
        )
    }
}

