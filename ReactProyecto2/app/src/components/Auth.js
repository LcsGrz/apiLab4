import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Login from './login'
import Register from './register'
var css =require('../styles')


export default class Auth extends React.Component{
constructor(props){
super(props);

}
render(){



  return (
        <Router>
          <div>

             <Route exact path="/" render={()=>(

               < Login />


             )}/>

            

              <Route path="/register" render=
                {()=>(

                  <Register />

                )}/>

          </div>
        </Router>
)
}



}
