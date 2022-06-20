import React from 'react'
import './App.css'
import { Header, Container } from './components'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container />
      </BrowserRouter>
    </div>
  )
}

export default App
