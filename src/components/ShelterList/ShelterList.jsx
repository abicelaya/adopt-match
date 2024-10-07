import React, { useContext } from "react";
import { SheltersContext } from "../../context/SheltersContext";

const ShelterList = () => {
  const { shelters } = useContext(SheltersContext);

  return (
    <div className="p-6 space-y-6">
      {shelters.map((shelters, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
        >
          <h2 className="text-xl font-semibold text-[#6dab71]">{shelters.name}</h2>
          <p className="text-gray-600">{shelters.address}</p>
          <p className="text-gray-600">{shelters.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default ShelterList;
