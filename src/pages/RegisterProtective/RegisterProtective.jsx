import React from 'react';

const RegisterProtective = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Protectora</h1>
        
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              placeholder="Ingresa tu nombre completo"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              placeholder="Ingresa tu teléfono"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="location"
              placeholder="Ingresa tu ubicación"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="registrationNumber"
              placeholder="Ingresa tu número de registro"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterProtective;

