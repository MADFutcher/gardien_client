import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

export default function WarningCard(props) {
    const [show, setShow] = useState(true);
    let colour

    switch (props.severity) {
        case 'high':
            colour='danger'
            break;
        case 'medium':
            colour='warning'
            break;
        case 'low':
            colour='secondary'
            break;
        default:
            colour='dark'
            break;
    }

    if (show) {
        return (
        <Alert variant={colour} onClose={() => setShow(false)} dismissible>
            <strong>Holy guacamole!</strong> You need to check some stuff!.
        </Alert>
        );
    }
    return null;
    }
