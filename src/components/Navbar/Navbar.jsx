import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMyAnimals = () => {
    navigate("/likes"); 
  };

  const handleProfile = () => {
    navigate("/shelter-profile");
  };

  return (
    <nav className="w-full bg-[#6dab71] text-white">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          {user ? `Hola, ${user.displayName || user.email}` : "AdoptMatch"}
        </h1>

        <div className="flex items-center">
          {user ? (
            <>
              {user.isShelter ? (  // Cambia esta línea según cómo determines si es protectora
                <button
                  onClick={handleProfile}
                  className="mr-4 hover:text-green-300"
                >
                  Perfil
                </button>
              ) : (
                <button
                  onClick={handleMyAnimals}
                  className="mr-4 hover:text-green-300"
                >
                  Mis animales
                </button>
              )}
              <button onClick={logout} className="hover:text-green-300">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="mr-4 hover:text-green-300">
                Registrarse
              </Link>
              <Link to="/login" className="hover:text-green-300">
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
