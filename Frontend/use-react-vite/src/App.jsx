import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventListComponent from './components/EventListComponent';
import AddEventComponent from './components/AddEventComponent';
import EventTypeListComponent from './components/EventTypeListComponent';
import EventListByDateComponent from './components/EventListByDateComponent';
import LoginComponent from './components/auth/LoginComponent';
import { Navigate } from 'react-router-dom';


function App() {

  return (
   <>
   
   <Router>

      <Routes>

        <Route path="/events/:type" element={<EventTypeListComponent />} />
        <Route path="/events/" element={<EventListComponent />} />
        <Route path="/events/newevent" element={<AddEventComponent />} />
        <Route path="/events/bydate" element={<EventListByDateComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>



   </Router>
   
   
   
   
   
   </>



  )
}

export default App
