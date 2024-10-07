import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const shelterRef = doc(db, "protectoras", currentUser.uid);
          const shelterDoc = await getDoc(shelterRef);
  
          if (shelterDoc.exists()) {
            const shelterData = shelterDoc.data(); // Aquí obtienes los datos
            setUser({
              ...currentUser,
              isShelter: true,
              fullName: shelterData.fullName || "Nombre desconocido", // Asegúrate de tener la propiedad fullName
            });
          } else {
            const adopterRef = doc(db, "adoptantes", currentUser.uid);
            const adopterDoc = await getDoc(adopterRef);
  
            if (adopterDoc.exists()) {
              const adopterData = adopterDoc.data(); // Aquí obtienes los datos
              setUser({
                ...currentUser,
                isShelter: false,
                fullName: adopterData.fullName || "Nombre desconocido", // Asegúrate de tener la propiedad fullName
              });
            } else {
              console.error("Usuario no encontrado en las colecciones.");
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error al obtener el tipo de usuario:", error);
        }
      } else {
        setUser(null);
      }
    });
  
    return () => unsubscribe();
  }, [auth, db]);
  

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
