import React from "react";
import AnimalBox from "../../components/AnimalBox/AnimalBox";
import Navbar from "../../components/Navbar/Navbar";

const Adopted = () => {
  const animals = [
    { id: 1, name: "Perro 1", image: "path/to/perro1.jpg" },
    { id: 2, name: "Gato 1", image: "path/to/gato1.jpg" },
    { id: 3, name: "Perro 2", image: "path/to/perro2.jpg" },
    { id: 4, name: "Gato 2", image: "path/to/gato2.jpg" },
    { id: 5, name: "Perro 3", image: "path/to/perro3.jpg" },
    { id: 6, name: "Gato 3", image: "path/to/gato3.jpg" },
    { id: 7, name: "Perro 4", image: "path/to/perro4.jpg" },
    { id: 8, name: "Gato 4", image: "path/to/gato4.jpg" },
    { id: 9, name: "Perro 5", image: "path/to/perro5.jpg" },
    { id: 10, name: "Gato 5", image: "path/to/gato5.jpg" },
    { id: 11, name: "Perro 6", image: "path/to/perro6.jpg" },
    { id: 12, name: "Gato 6", image: "path/to/gato6.jpg" },
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <Navbar />

      <AnimalBox animals={animals} />
    </div>
  );
};

export default Adopted;
