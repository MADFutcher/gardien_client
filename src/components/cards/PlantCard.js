import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import './css/PlantCard.css'

export default function PlantCard(props) {
    const {plantInfo} = props
    return (
        <Card className='mb-3' style={{ width: '100%', border:'none', backgroundColor:'#282c34'}}>
            <Card.Body>
            <Card.Title>Plants</Card.Title>
                    <ListGroup>
                        {
                            plantInfo.map((plant,index, plantInfo)=>{
                                if(plantInfo.length===1){
                                    return (
                                        <ListGroup.Item key={plant._id} className="fullBorder" style={{backgroundColor:'#282c34'}}>{plant.name}</ListGroup.Item>
                                    )
                                }else if(plantInfo.length===2){
                                    if(index===0){
                                        return (
                                            <ListGroup.Item key={plant._id} className="BorderTLR" style={{backgroundColor:'#282c34'}}>{plant.name}</ListGroup.Item>
                                        )
                                    }else{
                                        return (
                                            <ListGroup.Item key={plant._id} className="BorderBLR" style={{backgroundColor:'#282c34'}}>{plant.name}</ListGroup.Item>
                                        )
                                    }
                                    
                                }else if(index === 0 && plantInfo.length>2){
                                    return (
                                        <ListGroup.Item key={plant._id} className="BorderTLR" style={{backgroundColor:'#282c34'}}>{plant.name}</ListGroup.Item>
                                    )
                                }else if(plantInfo.length>2 && index<plantInfo.length && index!=plantInfo.length-1){
                                    return (
                                        <ListGroup.Item key={plant._id} className="BorderLR" style={{backgroundColor:'#282c34'}}>{plant.name}</ListGroup.Item>
                                    )
                                    
                                }else if(index===plantInfo.length-1){
                                    return (
                                        <ListGroup.Item key={plant._id} className="BorderBLR" style={{backgroundColor:'#282c34'}}>{plant.name}</ListGroup.Item>
                                    )
                                }
                                
                        })}
                    </ListGroup>
            </Card.Body>
        </Card>
    )
}
