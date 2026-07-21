import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Error from './Pages/Error'
import Service from './Pages/Service'
import Contact from './Pages/Contact'
import About from './Pages/About'
import ServiceDetail from './Pages/ServiceDetail'
import AdminPanel from './Admin/AdminPanel'
import { PageTransitionProvider } from './Components/PageTransition'
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
        <Route path="service" element={<Service />} />
        <Route path="servicedetail" element={<ServiceDetail />} />

        <Route path="admin" element={<AdminPanel />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <PageTransitionProvider>
        <AppContent />
      </PageTransitionProvider>
    </Router>
  )
}

export default App

