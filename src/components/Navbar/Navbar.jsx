// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full" style={{ backgroundColor: '#6dab71', color: 'white' }}>
      <div className="p-4 flex justify-between">
        <h1 className="text-lg font-bold">AdoptMatch</h1>
        <div>
          <Link to="/register" className="mr-4 hover:text-green-300">Registrarse</Link>
          <Link to="/login" className="hover:text-green-300">Iniciar Sesión</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



