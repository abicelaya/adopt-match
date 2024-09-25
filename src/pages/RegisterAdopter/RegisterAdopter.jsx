import React from "react";

const RegisterAdopter = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Adoptante - Información personal
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

        <h2 className="text-lg font-semibold mt-4">
          ¿Tienes animales en casa?
        </h2>
        <div className="flex space-x-4 mb-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full">
            Perro
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full">
            Gato
          </button>
        </div>

        <h2 className="text-lg font-semibold">Características del hogar</h2>
        <div className="flex space-x-4 mb-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full">
            Terraza
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full">
            Balcón
          </button>
        </div>

        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default RegisterAdopter;
