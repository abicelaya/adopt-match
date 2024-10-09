import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ShelterList from "../../components/ShelterList/ShelterList";
import { ShelterProvider } from "../../context/SheltersContext";

const Shelters = () => {
  return (
    <ShelterProvider>
      <div className="flex flex-col h-screen m-4">
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-4xl font-semibold  text-[#6dab71] mb-6">
            Listado de Protectoras
          </h1>
          <ShelterList />
        </div>
      </div>
    </ShelterProvider>
  );
};

export default Shelters;
