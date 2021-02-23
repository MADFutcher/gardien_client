import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'


export default class NewLocation extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="username" placeholder="Enter Username"  onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleOnChange}/>
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Button variant='secondary' type="submit" onClick={this.submitLogin}>
                                Login
                            </Button>
                        </Form>
                        </div>
                    </div>
                </div>
                <div>
                    <Link to='/signup'>
                        Signup
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}
