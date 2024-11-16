import './App.css';
import React from 'react';

import ExploreCambridge from './Components/ExploreCambridge';
import ExploreKitchener from './Components/ExploreKitchener';
import ExploreKWC from './Components/ExploreKWC';
import ExploreWaterloo from './Components/ExploreWaterloo';
import EventsPage from './Components/EventsPage';
import EventDetailsPage from './Components/EventDetailsPage';
import AdminDashboard from './Components/AdminDashboard';
import EventForm from './Components/EventForm';
import NavBar from './Components/NavBar';
import Login from './Components/Login'; 
import Signup from './Components/Signup'; 
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/ExploreKWC" />} />
          <Route path="/ExploreKWC">
            <Route index element={<ExploreKWC />} />
            <Route path="kitchener" element={<ExploreKitchener />} />
            <Route path="waterloo" element={<ExploreWaterloo />} />
            <Route path="cambridge" element={<ExploreCambridge />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events/new" element={<EventForm />} />
          <Route path="/admin/events/edit/:event_id" element={<EventForm />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:event_id" element={<EventDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ExploreKWC />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
