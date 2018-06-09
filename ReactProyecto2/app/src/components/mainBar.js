import React from 'react'
import {Link } from 'react-router-dom'
var css =require('../styles');
export default class MainBar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    return(



        <div style={css.mainBar}>

              <h2 style={{padding:'10px'}}>
                DESCRIPCION
              </h2>

        </div>

    )
  }
}
