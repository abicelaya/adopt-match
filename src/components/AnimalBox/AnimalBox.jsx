import React from "react";
import { Link } from "react-router-dom";

const AnimalBox = ({ animals }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {animals.map((animal) => (
        <div key={animal.id} className="flex flex-col items-center">
          <Link
            to={`/animal-profile/${animal.id}`}
            className="w-[160px] h-[180px] rounded-3xl border-4 border-[#bfdfc2] flex items-center justify-center"
          >
            <div className="w-[140px] h-[160px] bg-[#bfdfc2] rounded-3xl overflow-hidden border-4 border-[#4b764e]">
              <img
                src={animal.animalImage}
                className="w-full h-full object-cover"
                alt={animal.animalName}
              />
            </div>
          </Link>

          <div className="mt-4 flex items-center">
            <span className="text-[#4b764e] text-lg font-semibold">
              {animal.animalName}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimalBox;
