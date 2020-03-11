import React from 'react'
import axios from 'axios'
import Router from 'router/Router'
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = '/api/'

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
