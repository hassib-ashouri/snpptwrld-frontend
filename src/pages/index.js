import React, { useState, useEffect } from "react"
import { Router } from "@reach/router"
import Home from './home';
import Login from './login';
import Signup from './signup';

function App(props)
{
  return (
      <Router>
        <Home path='/' />
        <Login path='/login' />
        <Signup path='/signup' />
      </Router>
  )
}

export default App
