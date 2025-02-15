import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import AuthService from '../services/AuthService'
import AuthMe from '../services/AuthMe'


export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            email:'',
            errorMsg:'',
        }
    }

    service = new AuthService()


    handleOnChange = (e) =>{
        const name = e.target.name
        const val = e.target.value

        this.setState({
            [name]:val
        })

    }


    
    submitSignup = (e) =>{
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;

        this.service.signup(username, password, email)
            .then(response => {
                this.setState({
                    username: '',
                    password: '',
                    email:'',
                });
                localStorage.sid = response._id
                localStorage.setItem("userData",JSON.stringify({username:response.username, email:response.email}))
                AuthMe.login(() => {
                    this.props.history.push('/')
                  });
            },error => this.setState({errorMsg:error.response.data.message}))
    }


    render() {
        return (
            <header className='App-header'>
                <img src='../images/Logo1.png'></img>
                <div>
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
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" placeholder="example@example.com" onChange={this.handleOnChange}/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Button variant='secondary' type="submit" onClick={this.submitSignup}>
                                    Signup
                                </Button>
                            </Form>
                            </div>
                        </div>
                    </div>
                    <Link to='/Login'>
                        Login
                      </Link>
                </div>
                {this.state.errorMsg&&
                <div>
                    <div className='container'>
                        <Alert variant={'danger'}>
                            <h4>{this.state.errorMsg}</h4>
                        </Alert>
                    </div>
                </div>
                }
            </header>
        )
    }
}
