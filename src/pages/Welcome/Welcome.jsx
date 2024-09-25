import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate(); 

  const handleAccept = () => {
    navigate('/home'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Te damos la bienvenida a AdoptMatch</h1>
        <h2 className="text-lg font-semibold mb-2">Tu Compañero Ideal</h2>
        <p className="text-gray-700 mb-4">Explora los perfiles. ¡Tu nuevo amigo podría estar aquí!</p>
        
        <h2 className="text-lg font-semibold mb-2">Honestidad y Compromiso</h2>
        <p className="text-gray-700 mb-4">Completa tu perfil con sinceridad para encontrar el mejor match.</p>
        
        <h2 className="text-lg font-semibold mb-2">Tómatelo con Calma</h2>
        <p className="text-gray-700 mb-4">Adoptar es un gran compromiso. Asegúrate de estar listo.</p>
        
        <h2 className="text-lg font-semibold mb-2">Actúa con Confianza</h2>
        <p className="text-gray-700">Si estás listo, ¡lánzate y adopta! Estarás salvando una vida.</p>
        
        <button 
          onClick={handleAccept} 
          className="mt-6 w-full"
          style={{ backgroundColor: '#6dab71', color: 'white' }} 
        >
          Acepto las Condiciones
        </button>
      </div>
    </div>
  );
};

export default Welcome;
