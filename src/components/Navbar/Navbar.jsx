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
      </div>
    </nav>
  );
};

export default Navbar;
