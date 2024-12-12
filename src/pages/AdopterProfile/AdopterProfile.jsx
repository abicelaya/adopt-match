import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const AdopterProfile = () => {
  return (
    <div className="flex flex-col h-screen m-4">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <Link to="/register-adopter">
            <button className="bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Editar perfil
            </button>
          </Link>
          <Link to="/shelters">
            <button className="bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Protectoras
            </button>
          </Link>
          <Link to="/adoption-process">
            <button className="bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-3 rounded-lg transition duration-200 w-full">
              Proceso de adopción
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdopterProfile;
