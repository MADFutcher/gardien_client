import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthMe from '../services/AuthMe'


const ProtectedRoute  = ({component: Component , ...rest}) => {
  console.log(localStorage)
    return (
      <Route
        {...rest}
        render={ props  => {
            if (AuthMe.isAuthenticated() || localStorage.sid){
              return <Component {...props} id={localStorage.sid} userData={JSON.parse(localStorage.userData)} {...rest}/>
            } else {
              return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;