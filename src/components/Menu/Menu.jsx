import {
  IoHome,
  IoAddCircle,
  IoHeart,
  IoPerson,
  IoLogOut,
  IoCheckmark,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import './Menu.css';

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
      ? "menu-item-active"
      : "menu-item-inactive";
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
          <li className="mx-2">
            <Link to="/home" className={isActive("/home")}>
              <IoHome className={isActive("/home")} size={22} />
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/login" className={isActive("/login")}>
              <IoPerson className={isActive("/login")} size={24} />
            </Link>
          </li>
        </>
      );
    }

    // Usuario autenticado como protectora
    if (isShelter) {
      return (
        <>
          <li className="mx-2">
            <Link to="/home" className={isActive("/home")}>
              <IoHome size={24} />
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/animal-register"
              className={isActive("/animal-register")}
            >
              <IoAddCircle size={24} />
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/shelter-profile"
              className={isActive("/shelter-profile")}
            >
              <div className="relative">
                <IoPerson size={24} />
                <IoCheckmark className="absolute top-1 left-6 text-beige" size={16} />
              </div>
            </Link>
          </li>
          <li className="mx-2">
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
        <li className="mx-2">
          <Link to="/home" className={isActive("/home")}>
            <IoHome size={24} />
          </Link>
        </li>
        <li className="mx-2">
          <Link to="/favorites" className={isActive("/favorites")}>
            <IoHeart size={24} />
          </Link>
        </li>
        <li className="mx-2">
          <Link to="/adopter-profile" className={isActive("/adopter-profile")}>
            <div className="relative">
              <IoPerson size={24} />
              <IoCheckmark className="absolute top-1 left-6 text-beige" size={16} />
            </div>
          </Link>
        </li>
        <li className="mx-2">
          <button
            onClick={handleLogout}
            className="text-beige hover:text-white active:text-beige focus:text-beige transition-all duration-300 focus:outline-none active:bg-transparent"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <IoLogOut size={24} />
          </button>
        </li>
      </>
    );
  };

  return (
    <ul className="menu menu-horizontal bg-marron rounded-[2rem] py-2 flex justify-center items-center">
      {renderMenuItems()}
    </ul>
  );
};

export default Menu;
