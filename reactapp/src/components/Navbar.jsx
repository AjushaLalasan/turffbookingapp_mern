import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "20px", color: "white" }}>Home</Link>
      <Link to="/add" style={{ color: "white" }}>Add Booking</Link>
    </nav>
  );
};

export default Navbar;
