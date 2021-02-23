import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import WeatherCard from './WeatherCard'
import WarningCard from './WarningCard'

export default function LocationCard(props) {
    const {locationInfo} = props
    return (
        <Card className='mb-3' bg={'info'} style={{ width: '100%'}}>
            <Card.Body>
            <Link to={`/${locationInfo.user}/locations/${locationInfo._id}`} style={{ textDecoration: 'none', color: 'black' }}><Card.Title>{locationInfo.name}</Card.Title> </Link>
                <Card.Text className='text-muted'>{locationInfo.type}<br />{locationInfo.weatherInfo.location.name}</Card.Text>
                <Card.Text className='text-muted'></Card.Text>
                    <div className='row'>
                        <div className='col-md-4 mb-4'>
                            <WarningCard severity={'high'}/>
                            <WarningCard severity={'medium'}/>
                            <WarningCard severity={''}/>
                        </div>
                        <div className='col-md-4'>
                            <h5>Weather</h5>
                            <WeatherCard weatherInfo={locationInfo.weatherInfo} />
                        </div>
                        <div className='col-md-4'>
                            <h5>Plants</h5>
                            <p>{locationInfo.plants.length ? locationInfo.plants[0].name : null}</p>
                        </div>
                    </div>
            </Card.Body>
        </Card>
    )
}
