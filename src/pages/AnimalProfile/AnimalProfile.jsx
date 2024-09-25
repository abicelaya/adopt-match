import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const AnimalProfile = () => {
  const animal = {
    nombre: "Perro 1",
    edad: "2 años",
    salud: "Esterilizado",
    descripcion:
      "Gata de 2 años, muy tranquila, ideal para hogares con otros gatos calmados. Perfecta para un ambiente relajado.",
    image: "path/to/perro1.jpg",
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          <img
            src={animal.image}
            alt={animal.nombre}
            className="w-64 h-64 object-cover rounded-lg mb-4 md:mb-0"
          />
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {animal.nombre}
            </h2>
            <p className="text-lg mb-2 text-center">Edad: {animal.edad}</p>
            <p className="text-lg mb-2 text-center">Salud: {animal.salud}</p>
            <div className="my-4 border-t border-gray-300 w-full"></div>
            <p className="text-lg mb-4 text-center">{animal.descripcion}</p>
            <div className="flex space-x-4 justify-center">
              <Link to="/for-adoption">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                  Volver
                </button>
              </Link>
              <Link to="/adopt">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                  Adoptar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfile;
