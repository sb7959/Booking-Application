import "./navbar.css";
import { Link } from "react-router-dom";
import React from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">booking app</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="nav-items">
            <button className="nav-button">Register</button>
            <button className="nav-button">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
