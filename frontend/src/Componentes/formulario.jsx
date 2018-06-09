import React, { Component } from 'react';
import styled from 'styled-components';
import Txt from './textBoxP';
import Sbt from './submit';


class formulario extends Component {
  constructor(props) {
      super(props)
      this.state = {
        username: "",
        password: ""
      }
  }

  getusername = (v) => {
      this.setState({username: v})
  }

  getpassword = (v) => {
    this.setState({password: v})
  }

  render() {    
    return (
      <form action="/login" method="post">
        <div className="App">        
            {/* To get started, edit <code>src/App.js</code> and save to reload. */}
            <Txt placeholder="Username" img="user" name="credentials.user" get={this.getusername} />
            <Txt placeholder="Password" img="pass" colorF="green" colorT="red" get={this.getpassword}/>        
            <Sbt texto="Enviar" username={this.state.username} password={this.state.password} />
        </div>
      </form>
    );
  }
}

export default formulario;