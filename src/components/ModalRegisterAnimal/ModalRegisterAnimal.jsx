import React from "react";

const ModalRegisterAnimal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg text-center">
        <h2 className="text-2xl text-[#6dab71] font-semibold mb-4">{title}</h2>
        <p className="text-[#6dab71]">{message}</p>
      </div>
    </div>
  );
};

export default ModalRegisterAnimal;
