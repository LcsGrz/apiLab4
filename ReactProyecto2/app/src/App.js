import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import {Jumbotron,Nav,NavItem,Navbar} from 'react-bootstrap'

import Auth from './components/Auth'
import NavBarTop from './components/Navbar'

import MainBar from './components/mainBar'


class App extends React.Component{
constructor(props){
super(props);

}
render(){

  const wellStyles = {'height':'450px',margin: '0 auto 10px',"margin-top":'100px' ,"background-color":'red','padding':'10px'};

  return (
          <Router>
            <div >
            <NavBarTop />
              <div className='container' style={wellStyles}>
                

                

                  <Auth />
               
                </div>
            </div>
        </Router>
      )
}



}




ReactDOM.render(<App />, document.getElementById('root'));
