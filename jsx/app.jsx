import React from 'react'
import { render } from 'react-dom'
import MainPanel from 'main_panel'
import SignIn from 'sign_in'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export default class App extends React.Component {
  render () {
    if (!SignIn.isSignIned()) {
      return (<SignIn />)
    }
    return (
      <div className='container'>
        <div id='reef-pi-alert'/>
        <div className='container'>
          <MainPanel />
        </div>
      </div>
    )
  }
}
