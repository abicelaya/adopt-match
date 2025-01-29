import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    adjustHeight();

    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  const handleAccept = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(var(--vh,1vh)*100)] bg-verdeClaro pt-3">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-4xl font-dmSerif font-bold mb-6 text-left text-verdeOscuro">
          Te damos la bienvenida a AdoptMatch
        </h1>

        <h2 className="text-lg font-medium mb-2 text-verdeOscuro">
          Tu Compañero Ideal
        </h2>
        <p className="mb-4 text-verdeOscuro font-light">
          Explora los perfiles. ¡Tu nuevo amigo podría estar aquí!
        </p>

        <h2 className="text-lg font-medium mb-2 text-verdeOscuro">
          Honestidad y Compromiso
        </h2>
        <p className="mb-4 text-verdeOscuro font-light">
          Completa tu perfil con sinceridad para encontrar el mejor match.
        </p>

        <h2 className="text-lg font-medium mb-2 text-verdeOscuro">
          Tómatelo con Calma
        </h2>
        <p className="mb-4 text-verdeOscuro font-light">
          Adoptar es un gran compromiso. Asegúrate de estar listo.
        </p>

        <h2 className="text-lg font-medium mb-2 text-verdeOscuro">
          Actúa con Confianza
        </h2>
        <p className="text-verdeOscuro font-light">
          Si estás listo, ¡lánzate y adopta! Estarás salvando una vida.
        </p>
      </div>
      <div className="fixed bottom-20 right-10 z-10">
        <button
          onClick={handleAccept}
          className="bg-verdeOscuro bg-opacity-20 text-verdeOscuro rounded-full p-3 flex items-center justify-center"
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
