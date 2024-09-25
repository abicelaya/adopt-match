import React from 'react';

const AnimalBox = ({ animals }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {animals.map(animal => (
        <div key={animal.id} className="bg-gray-200 w-[154px] h-[151px] flex items-center justify-center rounded-lg shadow-md relative">
          <img src={animal.image} alt={animal.name} className="object-cover w-full h-full rounded-lg" />
          <span className="absolute text-white font-bold">{animal.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AnimalBox;
