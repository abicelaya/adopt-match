import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForAdoption from "./pages/ForAdoption/ForAdoption";
import AnimalProfile from "./pages/AnimalProfile/AnimalProfile";
import Likes from "./pages/Likes/Likes";
import { AuthProvider } from "./context/AuthContext";
import Shelters from "./pages/Shelters/Shelters";
import AdoptionProcess from "./pages/AdoptionProcess/AdoptionProcess";
import Start from "./pages/Start/Start";
import ShelterRegister from "./pages/ShelterRegister/ShelterRegister";
import AdopterRegister from "./pages/AdopterRegister/AdopterRegister";
import AnimalRegister from "./pages/AnimalRegister/AnimalRegister";

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
          <Route path="/shelter-register" element={<ShelterRegister />} />
          <Route path="/adopter-register" element={<AdopterRegister />} />
          <Route path="/animal-register" element={<AnimalRegister />} />
          <Route path="/for-adoption" element={<ForAdoption />} />
          <Route path="/animal-profile/:id" element={<AnimalProfile />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/adoption-process" element={<AdoptionProcess />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
