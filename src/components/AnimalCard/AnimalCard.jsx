import React from "react";
import { Link } from "react-router-dom";

const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const AnimalCard = ({ animal }) => {
  return (
    <Link
      to={`/animal-profile/${animal.id}`} 
      className="flex items-center p-4 rounded-lg mb-4 w-full max-w-md border-4 border-[#bfdfc2] hover:bg-gray-100 transition duration-200"
    >
      <div className="w-1/2 h-40 bg-[#bfdfc2] rounded-3xl overflow-hidden border-4 border-[#4b764e]"> 
        <img
          src={animal.animalPhoto}
          alt={animal.animalName}
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="ml-4 flex flex-col w-1/2"> 
        <h2 className="text-lg font-semibold text-[#4b764e]">
          {animal.animalName}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {truncateText(animal.animalDescription, 60)} 
        </p>
      </div>
    </Link>
  );
};

export default AnimalCard;
