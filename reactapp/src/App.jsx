import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddBooking from "./pages/AddBooking";
import './App.css'
function App() {
  return (
      <div style={{ padding: "20px" }}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBooking />} />
        </Routes>
      </div>
  );
}

export default App;
