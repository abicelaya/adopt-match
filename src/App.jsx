import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import RegisterProtective from "./pages/RegisterProtective/RegisterProtective";
import RegisterAdopter from "./pages/RegisterAdopter/RegisterAdopter";
import RegisterAnimal from "./pages/RegisterAnimal/RegisterAnimal";
import ProtectiveProfile from "./pages/ProtectiveProfile/ProtectiveProfile";
import Adopted from "./pages/Adopted/Adopted";
import ForAdoption from "./pages/ForAdoption/ForAdoption";
import AnimalProfile from "./pages/AnimalProfile/AnimalProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-protective" element={<RegisterProtective />} />
        <Route path="/register-adopter" element={<RegisterAdopter />} />
        <Route path="/register-animal" element={<RegisterAnimal />} />
        <Route path="/protective-profile" element={<ProtectiveProfile />} />
        <Route path="/adopted" element={<Adopted />} />
        <Route path="/for-adoption" element={<ForAdoption />} />
        <Route path="/animal-profile" element={<AnimalProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
