import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleAdopterProfile = () => {
    navigate("/adopter-profile");
  };

  const handleShelterProfile = () => {
    navigate("/shelter-profile");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className="w-full bg-white text-[#6dab71] rounded-xl">
      <div className="p-4 flex justify-between items-center">
        {location.pathname !== "/home" ? (
          <button onClick={goBack} className="text-2xl hover:text-[#4d7950]">
            <IoArrowBack />
          </button>
        ) : (
          <h1 className="text-lg font-bold">
            {user ? `Hola, ${user.fullName}` : "AdoptMatch"}
          </h1>
        )}

        <div className="flex items-center">
          {user ? (
            <>
              <button
                onClick={toggleMenu}
                className="mr-4 text-2xl hover:text-[#4d7950]"
              >
                <FiMenu />
              </button>
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-4 w-48 bg-[#6dab71] rounded-xl shadow-lg z-10"
                >
                  {user.isShelter ? (
                    <>
                      <button
                        onClick={handleShelterProfile}
                        className="block px-4 py-2 text-left text-white rounded-xl"
                      >
                        Perfil
                      </button>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-left text-white  rounded-xl"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleAdopterProfile}
                        className="block px-4 py-2 text-left text-white  rounded-xl"
                      >
                        Peril
                      </button>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-left text-white rounded-xl"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="hover:text-[#4d7950]">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
