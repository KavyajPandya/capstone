import React from "react";
import { NavLink } from "react-router-dom";
export default function NavBar() {
    return (
      <nav
        style={{
          height: "9%",
          width: "100%",
          backgroundColor: "rgb(1, 92, 166)",
          padding: "1%", 
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap:"9%"
        }}
      >
        <NavLink style={{textDecoration:"none",color:"white" }} to="/"><h1>Explore KWC</h1></NavLink>
        <NavLink style={{textDecoration:"none",color:"white" }} to="/ExploreKWC/kitchener"><h1>ExploreKitchener</h1></NavLink>
        <NavLink style={{textDecoration:"none",color:"white" }} to="/ExploreKWC/waterloo"><h1>ExploreWaterloo</h1></NavLink>
        <NavLink style={{textDecoration:"none",color:"white" }} to="/ExploreKWC/cambridge"><h1>ExploreCambridge</h1></NavLink>

      </nav>
    );
}