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
    <div className="h-screen bg-celesteGrisaceo overflow-hidden">
      <Navbar />

      <div className="pl-9 pt-5 pb-5 bg-celesteGrisaceo">
        <div className="relative">
          <div className="absolute left-0 top-1 w-[2px] h-20 bg-celeste"></div>

          <p className="text-celeste text-lg pl-4">
            Aquí encontrarás los animales que quieres conocer. Puede ser que, al
            contactar, el animalito ya esté adoptado. Recuerda, es una decisión
            importante.
          </p>
        </div>
      </div>

      <div className="bg-celeste rounded-t-3xl h-full">
        <div className="pt-8 pl-8">
          <div className="overflow-x-auto pb-4">
            <div className="flex">
              {likes.map((animal) => (
                <div
                  key={animal.animalId}
                  className="flex-none w-80 cursor-pointer text-celesteGrisaceo -ml-4"
                  onClick={() => handleCardClick(animal.animalId)}
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                    <img
                      src={animal.animalPhoto}
                      alt={animal.animalName}
                      className="w-[85%] h-full object-cover object-center mx-auto rounded-3xl"
                    />
                    <div className="absolute inset-x-[7.5%] bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl" />

                    <h2 className="absolute bottom-4 left-12 text-xl text-beige z-10">
                      {animal.animalName}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlike(animal.animalId);
                      }}
                      className="absolute bottom-4 right-12 text-beige hover:scale-110 transition-transform z-10"
                    >
                      <IoHeart size={28} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Likes;
