import React, { Component } from "react";
import './NavBar.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default class NavBar extends Component {


  logout = () =>{
      this.props.logUserOut()
  }

  render() {
    return (
      <React.Fragment>
        <Navbar className='bg-indigo' expand="lg" sticky="top">
          <Navbar.Brand className='text-marigold med pl-2'>MELLIFERA &#178;</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                  <Link to='/profile' className='text-marigold med pr-2 mr-3'>
                        {this.props.user.username}
                  </Link>
                  <Link to='/login' className='text-marigold med pr-2' onClick={this.logout}>
                      Logout
                  </Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
