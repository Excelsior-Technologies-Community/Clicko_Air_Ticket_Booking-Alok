import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Error from './Pages/Error'
import Contact from './Pages/Contact'
import About from './Pages/About'
import AdminPanel from './Admin/AdminPanel'
import './App.css'

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="error" element={<Error />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="admin" element={<AdminPanel />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
