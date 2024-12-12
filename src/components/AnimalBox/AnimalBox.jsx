import React from "react";
import { Link } from "react-router-dom";

const AnimalBox = ({ animals }) => {
  const getRandomHeight = () => {
    const heights = ["200px", "250px", "300px", "350px"];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {animals.map((animal) => (
        <div
          key={animal.id}
          className="mb-4 break-inside-avoid"
          style={{ height: getRandomHeight() }}
        >
          <Link
            to={`/animal-profile/${animal.id}`}
            className="w-full h-full block"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
              <img
                src={animal.animalPhoto}
                className="w-full h-full object-cover"
                alt={animal.animalName}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AnimalBox;
