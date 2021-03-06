import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import WeatherCard from './WeatherCard'
import WarningCard from './WarningCard'
import uuid from 'react-uuid'
import PlantCard from './PlantCard'

export default function LocationCard(props) {
    const {locationInfo} = props
    return (
        <Card className='mb-3' border='success' style={{ width: '100%', backgroundColor:'#282c34'}}>
            <Card.Body>
            <Link to={`/${locationInfo.user}/locations/${locationInfo._id}`} style={{ textDecoration: 'none', color: 'white' }}><Card.Text>{locationInfo.name}</Card.Text> </Link>
                <Card.Text className='text-muted'>{locationInfo.type}<br />{locationInfo.weatherInfo.location.name}</Card.Text>
                <Card.Text className='text-muted'></Card.Text>
                    <div className='row'>
                        <div className='col-md-4 mb-4'>
                            {locationInfo.warnings.map(warning=>{
                                return <WarningCard {...warning} key={uuid()}/>
                            })}
                        </div>
                        <div className='col-md-4'>
                            <WeatherCard weatherInfo={locationInfo.weatherInfo} />
                        </div>
                        <div className='col-md-4'>
                            <PlantCard plantInfo={locationInfo.plants} />
                        </div>
                    </div>
            </Card.Body>
        </Card>
    )
}
