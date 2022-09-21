import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="navbar-container">
      <p
        onClick={() => onRouteChange("signin")}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
