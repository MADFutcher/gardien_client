import React, { Component } from 'react'
import LocationService from '../services/LocationService'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import PlantCard from '../cards/PlantCard'



export default class Location extends Component {
    constructor(props){
        super(props)
        this.state={
            location:{},
            editing: false
        }
    }
    
    locationService = new LocationService()
    
    showEdit = () =>{
        this.setState({editing: !this.state.editing})
        
    }


    componentDidMount(){
        const userId = this.props.match.params.userId
        const locationId = this.props.match.params.locationId
        this.locationService.getSpecificLocation(userId, locationId)
                            .then(response => {
                                let location = response.data.locations[0]
                                this.setState({location})
                            })
    }

    render() {
        return (
            <div className='container-fluid'>
                <Card className='mt-5' border='success' style={{ width: '100%', height:'90vh', backgroundColor:'#282c34'}}>
                    <Card.Body>
                        <div className='text-left mb-3'>
                            <Button variant="outline-primary" onClick={this.showEdit}>Edit</Button>
                        </div>
                        <h2>{this.state.location.name}</h2>
                        <p>{this.state.location.type}</p>
                        



                        {this.state.editing&&
                        <h2>you are now editing</h2>}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
