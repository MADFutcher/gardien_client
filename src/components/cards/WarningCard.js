import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'


export default function WarningCard(props) {
    const [show, setShow] = useState(true);
    let colour
    let title
    switch (props.severity) {
        case 'high':
            colour='danger'
            title="Attention!"
            break;
        case 'medium':
            colour='warning'
            title='Warning'
            break;
        case 'low':
            colour='secondary'
            title="FYI"
            break;
        default:
            colour='dark'
            title="Something to know"
            break;
    }

    const icon = props.tempState==='low'?<i className="fal fa-temperature-frigid"></i>:<i className="fal fa-thermometer-full"></i>
    if (show) {
        return (
        <Alert variant={colour} onClose={() => setShow(false)} dismissible>
            <h4>{icon}</h4>
            {props.date}
            <br/>
            {props.plants.map(plant=>{return (<React.Fragment key={plant}>{plant}<br/></React.Fragment> )})}
        </Alert>
        );
    }
    return null;
    }
