import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleProtectoraClick = () => {
    navigate("/register-shelter");
  };

  const handleAdoptarClick = () => {
    navigate("/register-adopter");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Elige tu perfil</h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <button
          onClick={handleProtectoraClick}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Soy una protectora
        </button>
        <button
          onClick={handleAdoptarClick}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Quiero adoptar
        </button>
      </div>
      <p className="mt-6 text-gray-700">
        ¿Ya tienes cuenta?
        <Link to="/login" className="text-green-500 hover:underline ml-1">
          Iniciar sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default Register;
