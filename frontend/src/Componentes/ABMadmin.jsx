// Registrar
import React, { Component } from 'react';
import TextBox from './textBoxP';
import Submit from './submit';
import Roles from './roles';
import './basico.css'



class Abm extends Component {
  constructor(props) {
      super(props)
      this.state = {
        username: "",
        value:this.setValue
      }
  }
  
  getusername = (v) => {
      this.setState({username: v})
  }
  setValue = (e) => {
    var lab = document.getElementById("id");
    lab.value = "GG";
  }
  render() {  
    
    return (
            <div class="divredondo centerMargin sombra bordeRedondeados">  
                <TextBox type="text" placeholder="Username/Email" img="user" name="credentials.user" get={this.getusername} />
                <Roles />
                <Submit texto="Find" username={this.state.username}/>
                <Submit texto="Update" username={this.state.username} />
                <Submit texto="Delete" username={this.state.username} />
                
            </div>
    );
  }
}

export default Abm;