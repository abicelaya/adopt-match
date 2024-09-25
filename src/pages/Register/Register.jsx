import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Elige tu perfil</h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200">
          Soy una protectora
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200">
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
