import React from 'react'
import './App.css'
import { Header, Container } from './components'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [openDrawel, setOpenDrawel] = React.useState(true)

  return (
    <div className="App">
      <BrowserRouter>
        <Header openDrawel={openDrawel} setOpenDrawel={setOpenDrawel} />
        <Container openDrawel={openDrawel} />
      </BrowserRouter>
    </div>
  )
}

export default App
