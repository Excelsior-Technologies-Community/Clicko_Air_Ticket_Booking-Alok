import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Error from './Pages/Error'
import Contact from './Pages/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="error" element={<Error />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
