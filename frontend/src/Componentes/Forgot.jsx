import React, { Component } from 'react';
import styled from 'styled-components';
import TextBox from './textBoxP';
import Submit from './submit';
import './basico.css'
import logo from '../Imagenes/NUBE.png';
import Tilt from 'react-tilt' //movimiento de la imagen arreglar con nuevos CSS agregados para despues
class formulario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
        }
    }
    getusername = (v) => {  
        this.setState({ username: v })
    }

    render() {
        return (
            <div class="divredondo centerMargin sombra bordeRedondeados">
                <div class="centraVertical">   

                    <TextBox type="Email" placeholder="Email" img="pass" colorF="green" colorT="red" get={this.getusername} />
                    <Submit texto="Back"  />
                    <Submit texto="Accept" username={this.state.username} />
                                        
                </div>
            </div>
        );
    }
}

export default formulario;