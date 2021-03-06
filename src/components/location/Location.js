import React, { Component } from 'react'
import LocationService from '../services/LocationService'
import MapService from '../services/MapService'
import PlantService from '../services/PlantService'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import lodash from 'lodash'


export default class Location extends Component {
    constructor(props){
        super(props)
        this.state={
            location:{},
            editLocation: false,
            editPlant: false,
            plant:{
                plantId:'',
                name:'',
                type:'',
                ph:0,
                minTemp:0,
                maxTemp:0,
            },
        }
    }
    
    locationService = new LocationService()
    geocoding = new MapService()
    plantService = new PlantService()

    showEdit = () =>{
        this.setState({editLocation: !this.state.editLocation})
    }


    componentDidMount(){
        const userId = this.props.match.params.userId
        const locationId = this.props.match.params.locationId
        this.locationService.getSpecificLocation(userId, locationId)
                            .then(response => {
                                let location = response.data.locations[0]
                                location.street = location.address.split(', ')[0]
                                location.city = location.address.split(', ')[1]
                                location.country = location.address.split(', ')[2]
                                location.postcode = location.address.split(', ')[3]
                                this.setState({location})
                            })
    }

    handleOnChangeLocation = (e)=>{
        const target = e.target
        const name = target.name
        const val = target.value;
        this.setState({
            location:{ ...this.state.location, [name]: val}
        });
    }

    showPlantForm = (plantId) =>{
        const editPlant = this.state.location.plants.filter(plant=>plant._id === plantId)
        const {name, ph, minTemp, maxTemp, _id, type} = editPlant[0]
        this.setState({
            plant:{name,type, ph, minTemp, maxTemp, _id},
            editPlant:true
        })
    }

    handleOnChangePlant = (e)=>{
        const target = e.target
        const name = target.name
        const val = target.value;
        this.setState({
            plant:{ ...this.state.plant, [name]: val}
        });
    }

    handleLocationFormSubmit=(e)=>{
        e.preventDefault()
        const postcodeClean = this.state.location.postcode.replace(' ','')
        const {name, street, city, country, postcode, type} = this.state.location
        const address = `${street}, ${city}, ${country}, ${postcodeClean}`
        const geoCoding = new MapService()

        geoCoding.streetToLatLng(`${address}`)
                .then(response =>{
                    const updatedLocationInfo = {
                        name,
                        type,
                        address,
                        lat: response.lat,
                        lng: response.lng
                    }
                    console.log(updatedLocationInfo)
                    this.locationService.postUpdateLocation(this.props.match.params.userId, this.props.match.params.locationId,updatedLocationInfo)
                                        .then(()=>this.setState({editLocation:false}))
                }, err=>console.log(err))
    }

    handlePlantFormSubmit=(e)=>{
        e.preventDefault()
        const {name, ph, minTemp, maxTemp, type, _id} = this.state.plant
        const updatedPlantInfo = {
            name,
            ph,
            type,
            minTemp,
            maxTemp
        }
        this.plantService.postUpdatedPlant(this.props.match.params.userId, _id,updatedPlantInfo)
                         .then(()=>this.setState({editLocation:false}), err=>console.log(err))
    }


    deleteLocation = (e) =>{
        const userId = this.props.match.params.userId
        const locationId = this.props.match.params.locationId
        this.locationService.deleteLocation(userId, locationId)
                            .then(()=>this.props.history.push('/'))
    }






    buttonGrid=(arr, chunkSize)=>{
        const rows =  lodash.chunk(arr,chunkSize)
        return rows
    }

    render() {
        return (
            <div className='container-fluid'>
                <Card className='mt-2' border='success' style={{ width: '100%', minHeight:'99vh', backgroundColor:'#282c34'}}>
                    <Card.Body>
                        <div className='row'>
                            <div className='text-left p-4 col-4'>
                                <Button variant="outline-primary" onClick={this.showEdit}>Edit</Button>
                            </div>
                            <div className='text-left p-4 col-4'>
                                <Button variant="outline-primary" onClick={this.deleteLocation}>Delete</Button>
                            </div>
                            <div className='text-right p-4 col-4'>
                                <Link to={'/'}><Button variant="outline-warning">Overview</Button></Link>
                            </div>
                        </div>
                        <h2>{this.state.location.name}</h2>
                        <p>{this.state.location.type}</p>
                        <hr className='mb-2'/>
                        {this.state.editLocation&&
                            <React.Fragment>
                                <div className='row justify-content-md-center'>
                                    <div className='col-md-4 mt-2'>
                                        <Card className='mb-3' border='white' style={{ width: '100%', backgroundColor:'#282c34'}}>
                                            <Card.Body>
                                                <Form>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridName">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Location Name" name='name' value={this.state.location.name} onChange={this.handleOnChangeLocation}/>
                                                        </Form.Group>
                                                    </Form.Row>
                    
                                                    <Form.Group controlId="formGridAddress1">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control placeholder="1234 Main St" name='street' value={this.state.location.street} onChange={this.handleOnChangeLocation}/>
                                                    </Form.Group>
                    
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control name='city' value={this.state.location.city} onChange={this.handleOnChangeLocation}/>
                                                        </Form.Group>
                    
                                                        <Form.Group as={Col} controlId="formGridCountry">
                                                        <Form.Label>Country</Form.Label>
                                                        <Form.Control name='country' value={this.state.location.country}  onChange={this.handleOnChangeLocation}/>
                                                        </Form.Group>
                    
                                                        <Form.Group as={Col} controlId="formGridPostcode">
                                                        <Form.Label>Postcode</Form.Label>
                                                        <Form.Control name='postcode' value={this.state.location.postcode} onChange={this.handleOnChangeLocation}/>
                                                        </Form.Group>
                                                    </Form.Row>
                    
                                                    <Form.Group controlId="formGridSType">
                                                        <Form.Label>Type</Form.Label>
                                                        <Form.Control as="select" name='type' value={this.state.location.type} onChange={this.handleOnChangeLocation}>
                                                            <option></option>
                                                            <option>Indoor</option>
                                                            <option>Outdoor</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button variant="outline-success" className='mr-2' onClick={this.handleLocationFormSubmit}>Update</Button>
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    <div className='col'>
                                        <h2>Plants</h2>
                                        {
                                            this.buttonGrid(this.state.location.plants,4).map((row,i)=>{
                                                return (
                                                    <div key={i} className='row justify-content-center'>
                                                    {
                                                        row.map(bttn =>{
                                                            return (
                                                               <Button key={bttn._id} variant='outline-success' className='m-3' onClick={()=>{this.showPlantForm(bttn._id)}}>{bttn.name}</Button>
                                                                
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    
                                                    )
                                                })
                                        }   
                                    </div>
                                </div>
                                <hr />
                                <div className='row justify-content-center mb-3'>
                                    {this.state.editPlant&&
                                        <div className='col-md-4'>
                                            <Card border='white' style={{ width: '100%', backgroundColor:'#282c34'}}>
                                                <Card.Body>
                                                    <Form.Row >
                                                        <Form.Group as={Col} controlId="formGridPlantName">
                                                        <Form.Label>Plant Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Plant Name" name='name' value={this.state.plant.name} onChange={this.handleOnChangePlant}/>
                                                        </Form.Group>
                                                    </Form.Row>
                                    
                                                    <Form.Group controlId="formGridAddress1">
                                                    <Form.Label>Type</Form.Label>
                                                        <Form.Control as="select" name='type' defaultValue={this.state.plant.type} onChange={this.handleOnChangePlant}>
                                                            <option></option>
                                                            <option>Vegetable</option>
                                                            <option>Tree</option>
                                                            <option>Fruit</option>
                                                            <option>Flower</option>
                                                            <option>Shrub</option>
                                                            <option>Nuts</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                    
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="formGridPH">
                                                        <Form.Label>PH</Form.Label>
                                                        <Form.Control name='ph' type='number' value={this.state.plant.ph} onChange={this.handleOnChangePlant}/>
                                                        </Form.Group>
                                    
                                                        <Form.Group as={Col} controlId="formGridMinTemp">
                                                        <Form.Label>Min Temp</Form.Label>
                                                        <Form.Control name='minTemp' type='number' value={this.state.plant.minTemp}  onChange={this.handleOnChangePlant}/>
                                                        </Form.Group>
                                    
                                                        <Form.Group as={Col} controlId="formGridMaxTemp">
                                                        <Form.Label>Max Temp</Form.Label>
                                                        <Form.Control name='maxTemp' type='number' value={this.state.plant.maxTemp} onChange={this.handleOnChangePlant}/>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Button variant="outline-success"  onClick={this.handlePlantFormSubmit}>Update</Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    }   
                                </div>
                            </React.Fragment>
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
