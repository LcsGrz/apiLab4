// Registrar
import React, { Component } from 'react';
import TextBox from './textBoxP';
import Submit from './submit';
import './basico.css'



class Abm extends Component {
  constructor(props) {
      super(props)
      this.state = {
        username: "",
      }
  }
  
  getusername = (v) => {
      this.setState({username: v})
  }
  
  render() {  
      
    return (
        
            <div class="divredondo centerMargin sombra bordeRedondeados">  
                <TextBox type="text" placeholder="Username/Email" img="user" name="credentials.user" get={this.getusername} />
                <Submit texto="Find" username={this.state.username} />
                <ul></ul>
            </div>
    );
  }
}

export default Abm;