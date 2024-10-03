import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-[#6dab71]">
      <div className="p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-left text-white">
          Te damos la bienvenida a AdoptMatch
        </h1>

        <h2 className="text-lg font-bold mb-2 text-white">
          Tu Compañero Ideal
        </h2>
        <p className="mb-4 text-white font-extralight">
          Explora los perfiles. ¡Tu nuevo amigo podría estar aquí!
        </p>

        <h2 className="text-lg font-bold mb-2 text-white">
          Honestidad y Compromiso
        </h2>
        <p className="mb-4 text-white font-extralight">
          Completa tu perfil con sinceridad para encontrar el mejor match.
        </p>

        <h2 className="text-lg font-bold mb-2 text-white">
          Tómatelo con Calma
        </h2>
        <p className="mb-4 text-white font-extralight">
          Adoptar es un gran compromiso. Asegúrate de estar listo.
        </p>

        <h2 className="text-lg font-bold mb-2 text-white">
          Actúa con Confianza
        </h2>
        <p className="text-white font-extralight">
          Si estás listo, ¡lánzate y adopta! Estarás salvando una vida.
        </p>

        <button
          onClick={handleAccept}
          className="mt-10 w-full py-2 rounded-full bg-[#38853a] text-white border-2 border-white"
        >
          Acepto las Condiciones
        </button>
      </div>
    </div>
  );
};

export default Welcome;
