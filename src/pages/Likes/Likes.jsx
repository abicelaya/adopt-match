import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Likes = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const { user } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchLikes = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "likes"),
          where("adopterId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const likesData = querySnapshot.docs.map((doc) => doc.data());
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [user, db]);

  const handleUnlike = async (animalId) => {
    try {
      const likeRef = doc(db, "likes", `${user.uid}_${animalId}`);
      await deleteDoc(likeRef);
      setLikes(likes.filter((like) => like.animalId !== animalId));
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  const handleCardClick = (animalId) => {
    navigate(`/animal-profile/${animalId}`);
  };

  return (
    <div className="min-h-screen bg-celeste">
      <Navbar />

      <div className="px-4 pt-6">
        <p className="text-celesteGrisaceo text-center mb-4">
          Aquí encontrarás los animales que quieres conocer. Puede ser que, al
          contactar, el animalito ya esté adoptado. Recuerda, es una decisión
          importante.
        </p>

        <div className="w-full max-w-[80rem] mx-auto px-6 flex items-center gap-4 mb-4">
          <div className="h-[2px] flex-grow bg-celesteGrisaceo/20"></div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {likes.length > 0 ? (
            likes.map((animal) => (
              <div
                key={animal.animalId}
                className="relative h-64 rounded-xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleCardClick(animal.animalId)}
              >
                {/* Imagen de fondo */}
                <img
                  src={animal.animalPhoto}
                  alt={animal.animalName}
                  className="w-full h-full object-cover"
                />

                {/* Gradiente oscuro en la parte inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Contenido superpuesto */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-beige">
                      <h2 className="text-2xl">{animal.animalName}</h2>
                      <span className="text-sm opacity-90">sexo</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlike(animal.animalId);
                      }}
                      className="text-beige"
                    >
                      <IoHeart style={{ fontSize: "1.5rem" }} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-verdeOscuro">
              Aún no has agregado ningún animal a favoritos
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Likes;
