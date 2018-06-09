import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import {Jumbotron,Nav,NavItem,Navbar} from 'react-bootstrap'
export default class NavBarTop extends React.Component{

constructor (props){
  super(props);
}
render(){
  const wellStyles = {maxWidth: 350, margin: '0 auto 10px'};
  return(
    <Navbar>
    <Navbar.Header md={8}>
      <Navbar.Brand>
        <a href="#">React-Bootstrap</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
          <NavItem eventKey={2} href="#">Link Right</NavItem>
    </Nav>
    </Navbar>  
  )

}

}