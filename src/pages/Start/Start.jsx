import React, { useEffect } from "react";
import PerroGato from "../../../public/images/perro-gato.jpg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Start = () => {
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

  const handleNext = () => {
    navigate("/welcome");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(var(--vh,1vh)*100)]">
      {/* Imagen de fondo */}
      <img
        src={PerroGato}
        alt="Perro y gato"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-25"></div>

      {/* Slogan superpuesto */}
      <div className="absolute bottom-10 left-11 z-10">
        <h1 className="text-beige text-4xl md:text-6xl font-extralight leading-tight">
          Un match, <br />
          <span className="font-medium">una nueva</span>
          <br />
          <span className="font-medium">vida</span>
        </h1>
      </div>

      {/* Botón next */}
      <div className="absolute bottom-20 right-8 z-10">
        <button
          onClick={handleNext}
          className="bg-beige bg-opacity-20 text-beige rounded-full p-3 flex items-center justify-center"
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Start;
