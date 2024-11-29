import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import RegisterShelter from "./pages/RegisterShelter/RegisterShelter";
import RegisterAdopter from "./pages/RegisterAdopter/RegisterAdopter";
import RegisterAnimal from "./pages/RegisterAnimal/RegisterAnimal";
import ShelterProfile from "./pages/ShelterProfile/ShelterProfile";
import Adopted from "./pages/Adopted/Adopted";
import ForAdoption from "./pages/ForAdoption/ForAdoption";
import AnimalProfile from "./pages/AnimalProfile/AnimalProfile";
import Likes from "./pages/Likes/Likes";
import { AuthProvider } from "./context/AuthContext";
import Shelters from "./pages/Shelters/Shelters";
import AdopterProfile from "./pages/AdopterProfile/AdopterProfile";
import AdoptionProcess from "./pages/AdoptionProcess/AdoptionProcess";
import Start from "./pages/Start/Start";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Start />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-shelter" element={<RegisterShelter />} />
          <Route path="/register-adopter" element={<RegisterAdopter />} />
          <Route path="/register-animal" element={<RegisterAnimal />} />
          <Route path="/shelter-profile" element={<ShelterProfile />} />
          <Route path="/adopted" element={<Adopted />} />
          <Route path="/for-adoption" element={<ForAdoption />} />
          <Route path="/animal-profile/:id" element={<AnimalProfile />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/adopter-profile" element={<AdopterProfile />} />
          <Route path="/adoption-process" element={<AdoptionProcess />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
