import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import logo from '../../public/assets/images/blue-logo-transepernt.png'; 

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setIsLoggedIn(false); 
  };

  return (
    <nav
      style={{
        height: isMobile ? "auto" : "12vh",
        width: "100%",
        backgroundColor: "rgb(1, 92, 166)",
        padding: isMobile ? "0.5%" : "1%", 
        textAlign: "center",
        display: "flex",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
        gap: isMobile ? "2%" : "3%",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: isMobile ? "0" : "100%", 
          marginRight: isMobile ? "0" : "10px",
        }}
      />
      <NavLink
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1rem",
          fontWeight: isMobile ? "normal" : "bold", 
        }}
        to="/"
      >
        <h1>Explore KWC</h1>
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1rem",
          fontWeight: isMobile ? "normal" : "bold", 
        }}
        to="/ExploreKWC/kitchener"
      >
        <h1>Explore Kitchener</h1>
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1rem",
          fontWeight: isMobile ? "normal" : "bold", 
        }}
        to="/ExploreKWC/waterloo"
      >
        <h1>Explore Waterloo</h1>
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1rem",
          fontWeight: isMobile ? "normal" : "bold", 
        }}
        to="/ExploreKWC/cambridge"
      >
        <h1>Explore Cambridge</h1>
      </NavLink>
      <NavLink
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1rem",
          fontWeight: isMobile ? "normal" : "bold", 
        }}
        to="/events"
      >
        <h1>Events</h1>
      </NavLink>
      {isLoggedIn ? (
        <NavLink
          onClick={handleLogout}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1.5rem",
            fontWeight: isMobile ? "normal" : "bold",
            marginRight:'0%',
            marginLeft:'auto'
          }}
        >
          Logout
        </NavLink>
      ) : (
        <NavLink to="/login" 
        style={{ 
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1.5rem",
          fontWeight: isMobile ? "normal" : "bold",
          marginRight:'0%',
          marginLeft:'auto'
        }}>
          Login
        </NavLink>
      )}


      {/* <NavLink
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: isMobile ? "0.6rem" : isTablet ? "0.8rem" : "1rem",
          fontWeight: isMobile ? "normal" : "bold",
        }}
        to="/login"
      >
        <h1>Login</h1>
      </NavLink> */}
    </nav>
  );
}
