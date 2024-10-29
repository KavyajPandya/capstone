import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../public/assets/images/blue-logo-transepernt.png'; 

export default function NavBar() {
    return (
      <nav
        style={{
          height: "12vh",
          width: "100%",
          backgroundColor: "rgb(1, 92, 166)",
          padding: "1%", 
          textAlign: "center",
          display: "flex",
          boxSizing: "border-box", 
          justifyContent: "center",
          alignItems: "center",
          gap: "3%"
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "110%", marginRight: "10px" }} />
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/"><h1>Explore KWC</h1></NavLink>
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/ExploreKWC/kitchener"><h1>Explore Kitchener</h1></NavLink>
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/ExploreKWC/waterloo"><h1>Explore Waterloo</h1></NavLink>
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/ExploreKWC/cambridge"><h1>Explore Cambridge</h1></NavLink>
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/events"><h1>Events</h1></NavLink>
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/login"><h1>Login</h1></NavLink>
      </nav>
    );
}
