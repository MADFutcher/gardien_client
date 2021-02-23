import React from 'react'
import Card from 'react-bootstrap/Card'

export default function WeatherCard(props) {
    const {weatherInfo} = props
    return (
        <Card className='mb-3' style={{ width: '100%', border:'none', backgroundColor:'#282c34'}}>
            <Card.Img variant="top" src={weatherInfo.current.condition.icon} style={{ width: '20%' }} className='mx-auto pt-2' />
            <Card.Text>{weatherInfo.current.temp_c}&#8451;<br/>{weatherInfo.current.condition.text}</Card.Text>
            <Card.Body>
                <Card.Text>
                    Rainfall {weatherInfo.current.precip_mm}mm
                    <br/>
                    Humidity {weatherInfo.current.humidity}%
                    <br/>
                    Cloud Coverage {weatherInfo.current.cloud}%
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
