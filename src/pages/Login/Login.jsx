import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default Login;
