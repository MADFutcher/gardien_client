import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import './NewLocationForm.css'


export default class NewLocation extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            street:'',
            city:'',
            country:'',
            postcode:'',
            type:'',
            addPlants:false,
            howManyPlants:'',
            plants:[],
            plant:{
                name:'',
                type:'',
                ph:0,
                minTemp:0,
                maxTemp:0,
            }
        }
    }


    handleOnCange = (e)=>{
        const target = e.target
        const name = target.name
        const val = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: val
          });
        console.log(this.state)
    }

    handlePlantChange = (e) =>{
        const target = e.target
        const name = target.name
        const val = target.value
        this.setState({
            plant:{ ...this.state.plant, [name]: val}
        })
    }

    handlePlantSubmit = () =>{
        const currentPlant = {...this.state.plant}
        const currentPlantsArr = [...this.state.plants]
        currentPlantsArr.push(currentPlant)
        this.setState({
            plants:currentPlantsArr,
            plant:{
                name:'',
                type:'',
                ph:0,
                minTemp:0,
                maxTemp:0,
            }
        })
    
    }


    handleLocationSubmit = () =>{
        console.log(this.state)
    }



    render() {
        return (
            <React.Fragment>
                <div className='container-fluid locationForm'>
                    <div className='row p-5'>
                        <div className='col-12 text-left'>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Location Name" name='name' value={this.state.name} onChange={this.handleOnCange}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control placeholder="1234 Main St" name='street' value={this.state.street} onChange={this.handleOnCange}/>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name='city' value={this.state.city} onChange={this.handleOnCange}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control name='country' value={this.state.country}  onChange={this.handleOnCange}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPostcode">
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control name='postcode' value={this.state.postcode} onChange={this.handleOnCange}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="formGridSType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" name='type' value={this.state.type} onChange={this.handleOnCange}>
                                        <option>Indoor</option>
                                        <option>Outdoor</option>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Row inline="true">
                                    <Form.Group id="formGridCheckbox" className='mr-2'>
                                        <Form.Check type="checkbox" label="Add Plants?" name="addPlants" checked={this.state.addPlants} onChange={this.handleOnCange}/>
                                    </Form.Group>
                                </Form.Row>
                                <hr />
                                {this.state.addPlants &&
                                    <React.Fragment >
                                        <div>
                                            <Form.Row >
                                                <Form.Group as={Col} controlId="formGridName">
                                                <Form.Label>Plant Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Location Name" name='name' value={this.state.plant.name} onChange={this.handlePlantChange}/>
                                                </Form.Group>
                                            </Form.Row>
                            
                                            <Form.Group controlId="formGridAddress1">
                                            <Form.Label>Type</Form.Label>
                                                <Form.Control as="select" name='type' defaultValue={this.state.plant.type} onChange={this.handlePlantChange}>
                                                    <option>Vegetable</option>
                                                    <option>Tree</option>
                                                    <option>Fruit</option>
                                                    <option>Flower</option>
                                                    <option>Shrub</option>
                                                    <option>Nuts</option>
                                                </Form.Control>
                                            </Form.Group>
                            
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>PH</Form.Label>
                                                <Form.Control name='ph' type='number' value={this.state.plant.ph} onChange={this.handlePlantChange}/>
                                                </Form.Group>
                            
                                                <Form.Group as={Col} controlId="formGridCountry">
                                                <Form.Label>Min Temp</Form.Label>
                                                <Form.Control name='maxTemp' type='number' value={this.state.plant.maxTemp}  onChange={this.handlePlantChange}/>
                                                </Form.Group>
                            
                                                <Form.Group as={Col} controlId="formGridPostcode">
                                                <Form.Label>Max Temp</Form.Label>
                                                <Form.Control name='minTemp' type='number' value={this.state.plant.minTemp} onChange={this.handlePlantChange}/>
                                                </Form.Group>
                                            </Form.Row>
                                            <Button variant="outline-success" className='mr-2' onClick={this.handlePlantSubmit}>Submit</Button>
                                            <hr />
                                        </div>
                                    </React.Fragment>
                                
                                
                                
                                }
                                
                    
                                <div className='text-center'>
                                    <Button variant="outline-success" className='mr-2' onClick={this.handleLocationSubmit}>Submit</Button>
                                    <Link to='/'>
                                        <Button variant="outline-danger">Cancel</Button>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
