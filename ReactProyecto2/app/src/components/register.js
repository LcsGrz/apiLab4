import React from 'react'
import {Link } from 'react-router-dom'
var css =require('../styles');
export default class Register  extends React.Component{

constructor(props){
  super(props);
}

render(){
  return(
    <div style={css.contAuth}>
         <input type='text' style={css.text} placeholder='NOMBRE Y APELLIDO' />
         <input type='text' style={css.text} placeholder='NOMBRE DE USUARIO'/>
         <input type='pass' style={css.text} placeholder='CONTRASEÑA'/><br/>
         <input type='button' value='ingresar'  style={css.button} placeholder='REPETIR CONTRASEÑA'/><br/>
         <p><Link to={`/`} style={css.textoPie}>
          Poséo cuenta

         </Link>
         </p>
    </div>
  )
}



}
