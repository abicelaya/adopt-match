import React from "react";
import Navbar from "../../components/Navbar/Navbar"; 
import ShelterList from "../../components/ShelterList/ShelterList";
import { ShelterProvider } from "../../context/SheltersContext"; 

const Shelters = () => {
  return (
    <ShelterProvider>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold text-center text-[#6dab71] mb-8">
          Listado de Protectoras
        </h1>
        <ShelterList />
      </div>
    </ShelterProvider>
  );
};

export default Shelters;
