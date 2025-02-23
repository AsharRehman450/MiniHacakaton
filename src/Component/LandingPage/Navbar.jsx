import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">Hotel Management</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="auth-buttons">
        <button className="login-btn"onClick={()=>  navigate("/login")} >
          Login
        </button>
        <button className="signup-btn" onClick={() =>  navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;