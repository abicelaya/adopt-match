import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    <nav className="w-full bg-beige text-marron rounded-xl">
      <div className="flex justify-between items-center pt-4 px-6">
        {location.pathname !== "/home" ? (
          <button onClick={goBack} className="text-2xl hover:text-[#4d7950]">
            <IoArrowBack />
          </button>
        ) : (
          <h1 className="text-lg font-medium text-marron">
            {user ? (
              <>
                <span className="font-poppins">Hola, </span>
                <span className="font-dmSerif text-2xl font-bold">
                  {user.fullName}
                </span>
              </>
            ) : (
              <span className="font-poppins">AdoptMatch</span>
            )}
          </h1>
        )}
      </div>
      <div>
        <div className="w-full max-w-[80rem] px-5 mx-auto flex justify-between gap-4 py-3">
          <button className="flex-1 bg-beige text-marron hover:text-beige text-medium border border-marron py-1 px-4 rounded-full font-poppins hover:bg-marron transition-all duration-300 active:bg-opacity-80">
            Perros
          </button>
          <button className="flex-1 bg-beige text-marron hover:text-beige text-medium border border-marron py-1 px-4 rounded-full font-poppins hover:bg-marron transition-all duration-300 active:bg-opacity-80">
            Gatos
          </button>
          <button className="flex-1 bg-beige text-marron hover:text-beige text-medium border border-marron py-1 px-4 rounded-full font-poppins hover:bg-marron transition-all duration-300 active:bg-opacity-80">
            Todos
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
