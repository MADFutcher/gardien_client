
import './App.css'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes'
import Main from './components/main/Main'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NewLocation from './components/location/NewLocation'
import Location from './components/location/Location'


export default class App extends React.Component {

  render(){
    return (
    <div className="App">
          <Switch>
            <Route exact path='/login' render={(props)=><Login {...props}/>}/>
            <Route exact path='/signup' render={(props)=><Signup {...props}/>}/>
            <ProtectedRoute
              exact
              path='/' 
              component={Main}
            />
            <ProtectedRoute
              exact
              path='/:userId/locations/newlocation' 
              component={NewLocation}
            />
            <ProtectedRoute
              path='/:userId/locations/:locationId' 
              component={Location}
            />
          </Switch>
      </div>
    );
  }
  
}

