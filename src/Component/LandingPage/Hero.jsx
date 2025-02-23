import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Hotel</h1>
        <p>Experience luxury and comfort like never before.</p>
        <button className="cta-btn" onClick={() => alert("Book Now!")}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Hero;