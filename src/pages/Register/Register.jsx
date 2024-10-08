import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Register = () => {
  const navigate = useNavigate();

  const handleProtectoraClick = () => {
    navigate("/register-shelter");
  };

  const handleAdoptarClick = () => {
    navigate("/register-adopter");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 relative">
      <button
        onClick={goBack}
        className="absolute top-0 left-0 m-4 text-2xl text-[#6dab71] p-4 hover:text-green-300"
      >
        <IoArrowBack />
      </button>
      <h1 className="text-2xl text-[#6dab71] font-semibold mb-8">
        Elige tu perfil
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <button
          onClick={handleProtectoraClick}
          className="bg-[#6dab71] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Soy una protectora
        </button>
        <button
          onClick={handleAdoptarClick}
          className="bg-[#6dab71] hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Quiero adoptar
        </button>
      </div>
      <p className="mt-6 text-gray-700">
        ¿Ya tienes cuenta?
        <Link to="/login" className="text-[#6dab71] hover:underline ml-1">
          Iniciar sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default Register;
