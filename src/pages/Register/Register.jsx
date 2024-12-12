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
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-celeste p-4 relative">
      <button
        onClick={goBack}
        className="absolute top-0 left-0 m-4 text-2xl text-celesteGrisaceo hover:text-[#4f5c62] p-4 "
      >
        <IoArrowBack />
      </button>
      <h1 className="text-4xl text-center text-celesteGrisaceo font-dmSerif font-semibold mb-8">
        ¿Cómo quieres ayudar?
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <button
          onClick={handleProtectoraClick}
          className="bg-celesteGrisaceo hover:bg-[#4f5c62] bg-opacity-80 text-beige font-regular py-3 px-8 rounded-full w-3/4 mx-auto block transition duration-200"
        >
          SOY UNA PROTECTORA
        </button>
        <button
          onClick={handleAdoptarClick}
          className="bg-celesteGrisaceo hover:bg-[#4f5c62] bg-opacity-80 text-beige font-regular py-3 px-8 rounded-full w-3/4 mx-auto block transition duration-200"
        >
          QUIERO ADOPTAR
        </button>
      </div>
      <p className="mt-12 text-celesteGrisaceo font-medium">
        ¿Ya tienes cuenta?
        <Link
          to="/login"
          className="text-celesteGrisaceo font-light hover:underline ml-1 "
        >
          Iniciar sesión aquí
        </Link>
      </p>
    </div>
  );
};

export default Register;
