import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="service-cards">
        <div className="card">
          <h3>Luxury Rooms</h3>
          <p>Experience the best in class luxury rooms.</p>
        </div>
        <div className="card">
          <h3>Fine Dining</h3>
          <p>Enjoy delicious meals from our world-class chefs.</p>
        </div>
        <div className="card">
          <h3>Spa & Wellness</h3>
          <p>Relax and rejuvenate with our spa services.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;