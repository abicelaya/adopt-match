import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const ShelterProfile = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h2 className="text-2xl font-bold mb-6">Nombre de la Protectora</h2>
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <Link to="/register-shelter">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Editar perfil
            </button>
          </Link>
          <Link to="/for-adoption">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Por adoptar
            </button>
          </Link>
          <Link to="/adopted">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Adoptados
            </button>
          </Link>
          <Link to="/register-animal">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Registrar animal
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShelterProfile;
