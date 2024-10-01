import React from 'react';

const AnimalBox = ({ animals }) => {
  console.log(animals)
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {animals.map(animal => (
        <div key={animal.id} className="flex flex-col items-center">
          <div className="bg-gray-200 w-[154px] h-[151px] rounded-lg shadow-md overflow-hidden">
            <img 
              src={animal.animalImage} 
              alt={animal.animalName} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <span className="mt-2 text-black text-lg text-center">
            {animal.animalName}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnimalBox;
