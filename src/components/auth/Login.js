import React, { Component } from 'react'
// import './Login.css'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import AuthService from '../services/AuthService'
import AuthMe from "../services/AuthMe";

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
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

    submitLogin = (e) =>{
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.service.login(username, password)
            .then(response => {
                this.setState({
                    username: "",
                    password: "",
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
                            <div className='col-12 mt-5'>
                            <Form>
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="formBasicUsername">
                                            <Form.Control type="text" name="username" placeholder="Enter Username"  onChange={this.handleOnChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formBasicPassword">
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
                    <Link to='/signup'>
                        Signup
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
