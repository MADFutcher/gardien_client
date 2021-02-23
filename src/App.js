// import './colour.css'
import './App.css'
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Route, Switch, withRouter } from 'react-router-dom'
// import Profile from './components/profile/Profile'
import ProtectedRoute from './components/protectedRoutes/ProtectedRoutes'
import Main from './components/main/Main'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import NewLocation from './components/location/NewLocation'
import AllLocations from './components/location/AllLocations'





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
              id={localStorage.sid ? localStorage.sid : null}
              userData={localStorage.userData ? JSON.parse(localStorage.userData) : null}
              component={Main}
            />
            <ProtectedRoute
              exact
              path='/:userId/locations' 
              id={localStorage.sid ? localStorage.sid : null}
              userData={localStorage.userData ? JSON.parse(localStorage.userData) : null}
              component={AllLocations}
            />
            <ProtectedRoute
              exact
              path='/:userId/locations' 
              id={localStorage.sid ? localStorage.sid : null}
              userData={localStorage.userData ? JSON.parse(localStorage.userData) : null}
              component={AllLocations}
            />
            <ProtectedRoute
              exact
              path='/:userId/locations/newlocation' 
              id={localStorage.sid ? localStorage.sid : null}
              userData={localStorage.userData ? JSON.parse(localStorage.userData) : null}
              component={NewLocation}
            />
          </Switch>
      </div>
    );
  }
  
}

