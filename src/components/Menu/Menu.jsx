import {
  IoHome,
  IoAddCircle,
  IoHeart,
  IoPerson,
  IoLogIn,
  IoLogOut,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const Menu = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShelter, setIsShelter] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      setIsShelter(user.isShelter);
    } else {
      setIsAuthenticated(false);
      setIsShelter(false);
    }
  }, [user]);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-white scale-125 transition-all duration-300"
      : "text-beige hover:text-white transition-all duration-300";
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const renderMenuItems = () => {
    // Usuario no autenticado
    if (!isAuthenticated) {
      return (
        <>
          <li className="mx-4">
            <Link to="/home" className={isActive("/home")}>
              <IoHome size={24} />
            </Link>
          </li>
          <li className="mx-4">
            <Link to="/login" className={isActive("/login")}>
              <IoLogIn size={24} />
            </Link>
          </li>
        </>
      );
    }

    // Usuario autenticado como protectora
    if (isShelter) {
      return (
        <>
          <li className="mx-4">
            <Link to="/home" className={isActive("/home")}>
              <IoHome size={24} />
            </Link>
          </li>
          <li className="mx-4">
            <Link
              to="/animal-register"
              className={isActive("/animal-register")}
            >
              <IoAddCircle size={24} />
            </Link>
          </li>
          <li className="mx-4">
            <Link
              to="/shelter-profile"
              className={isActive("/shelter-profile")}
            >
              <IoPerson size={24} />
            </Link>
          </li>
          <li className="mx-4">
            <button
              onClick={handleLogout}
              className="text-beige hover:text-white transition-all duration-300"
            >
              <IoLogOut size={24} />
            </button>
          </li>
        </>
      );
    }

    // Usuario autenticado como adoptante
    return (
      <>
        <li className="mx-4">
          <Link to="/home" className={isActive("/home")}>
            <IoHome size={24} />
          </Link>
        </li>
        <li className="mx-4">
          <Link to="/favorites" className={isActive("/favorites")}>
            <IoHeart size={24} />
          </Link>
        </li>
        <li className="mx-4">
          <Link to="/adopter-profile" className={isActive("/adopter-profile")}>
            <IoPerson size={24} />
          </Link>
        </li>
        <li className="mx-4">
          <button
            onClick={handleLogout}
            className="text-beige hover:text-white transition-all duration-300"
          >
            <IoLogOut size={24} />
          </button>
        </li>
      </>
    );
  };

  return (
    <ul className="menu menu-horizontal bg-marron rounded-box py-4 flex justify-center items-center">
      {renderMenuItems()}
    </ul>
  );
};

export default Menu;
