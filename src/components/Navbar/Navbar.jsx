import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa el hook useAuth para acceder al usuario y logout

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtén el usuario y la función logout desde el contexto

  return (
    <nav className="w-full" style={{ backgroundColor: '#6dab71', color: 'white' }}>
      <div className="p-4 flex justify-between">
        <h1 className="text-lg font-bold">AdoptMatch</h1>
        <div>
          {user ? (
            // Si el usuario está autenticado, muestra la opción de cerrar sesión
            <>
              <span className="mr-4">Hola, {user.email}</span>
              <button
                onClick={logout}
                className="hover:text-green-300"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            // Si no está autenticado, muestra las opciones de registrarse e iniciar sesión
            <>
              <Link to="/register" className="mr-4 hover:text-green-300">Registrarse</Link>
              <Link to="/login" className="hover:text-green-300">Iniciar Sesión</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



