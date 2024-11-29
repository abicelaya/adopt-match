import React from "react";
import PerroGato from "../../../public/images/perro-gato.jpg";
import { FaArrowRight } from "react-icons/fa";

const Start = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Imagen de fondo */}
      <img
        src={PerroGato}
        alt="Perro y gato"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-40"></div>

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
        <button className="bg-beige bg-opacity-20 text-beige rounded-full p-3 flex items-center justify-center">
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Start;
