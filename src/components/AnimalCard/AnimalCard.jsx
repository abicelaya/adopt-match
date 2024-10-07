import React from "react";

const AnimalCard = ({ animal }) => {
  return (
    <div className="bg-[#f3f3f3] p-4 rounded-lg mb-4 w-full max-w-md">
      <img
        src={animal.animalPhoto}
        alt={animal.animalName}
        className="w-full h-32 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{animal.animalName}</h2>
      <p>{animal.animalDescription}</p>
    </div>
  );
};

export default AnimalCard;
