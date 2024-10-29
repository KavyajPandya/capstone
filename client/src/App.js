import './App.css';
import React from 'react';

import ExploreCambridge from './Components/ExploreCambridge';
import ExploreKitchener from './Components/ExploreKitchener';
import ExploreKWC from './Components/ExploreKWC';
import ExploreWaterloo from './Components/ExploreWaterloo';
import EventsPage from './Components/EventsPage';
import EventDetailsPage from './Components/EventDetailsPage';
import NavBar from './Components/NavBar';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (<>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/ExploreKWC" />} />
        <Route path="/ExploreKWC">
          <Route index element={<ExploreKWC />} />
          <Route path="kitchener" element={<ExploreKitchener />} />
          <Route path="waterloo" element={<ExploreWaterloo />} />
          <Route path="cambridge" element={<ExploreCambridge />} />
          {/* <Route path="events" element={<EventsPage />} /> */}
          {/* <Route path="/events/:event_id" element={<EventDetailsPage />} /> */}
        </Route>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:event_id" element={<EventDetailsPage />} />
        <Route path="*" element={<ExploreKWC />} />
      </Routes>
      {/* <ExploreKWC/> */}
    </div>
    </>
  );
}

export default App;
