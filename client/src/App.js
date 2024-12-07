import './App.css';
import React,{ useState, useEffect } from 'react';

import ExploreCambridge from './Components/ExploreCambridge';
import ExploreKitchener from './Components/ExploreKitchener';
import ExploreKWC from './Components/ExploreKWC';
import ExploreWaterloo from './Components/ExploreWaterloo';
import EventsPage from './Components/EventsPage';
import EventDetailsPage from './Components/EventDetailsPage';
import CheckoutPage from './Components/CheckoutPage';
import PayPalPayment from './Components/PayPalPayment';
import AdminDashboard from './Components/AdminDashboard';
import EventForm from './Components/EventForm';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // Set logged-in state if user exists in localStorage
    }
  }, []);

  // Define paths where NavBar should NOT be visible
  const hideNavBarPaths = ['/admin', '/admin/events/new', '/admin/events/edit'];

  // Check if the current path starts with any of the hideNavBarPaths
  const shouldHideNavBar = hideNavBarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <div className="App">
        {/* Conditionally render NavBar */}
        {!shouldHideNavBar && <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
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
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ExploreKWC />} />
          <Route path="/checkout/:event_id" element={<CheckoutPage />} />
          <Route path="/paypal-payment/:event_id" element={<PayPalPayment />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
