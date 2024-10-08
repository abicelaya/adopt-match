import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import AnimalCard from "../../components/AnimalCard/AnimalCard";
import { useAuth } from "../../context/AuthContext";

const Likes = () => {
  const [likedAnimals, setLikedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLikedAnimals = async () => {
      if (!user) return;
      try {
        const likesCollectionRef = collection(db, "likes");
        const filteredLikesQuery = query(
          likesCollectionRef,
          where("adopterId", "==", user.uid)
        );
        const likesSnapshot = await getDocs(filteredLikesQuery);

        const likedAnimalsData = await Promise.all(
          likesSnapshot.docs.map(async (likeDoc) => {
            const like = likeDoc.data();
            const animalId = like.animalId;
            const animalRef = doc(db, "animales", animalId);
            const animalSnap = await getDoc(animalRef);

            if (!animalSnap.exists()) {
              console.error(`Animal con ID ${animalId} no encontrado.`);
              return null;
            }

            return { id: animalId, ...animalSnap.data() };
          })
        );

        setLikedAnimals(likedAnimalsData.filter((animal) => animal !== null));
      } catch (error) {
        console.error("Error al obtener los animales guardados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedAnimals();
  }, [db, user]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-4xl font-semibold text-[#6dab71] mb-6">
            Animales por conocer
          </h1>
        </div>

        <div className="flex flex-col items-center">
          {loading ? (
            <p>Cargando animales...</p>
          ) : likedAnimals.length === 0 ? (
            <p>No hay animales registrados.</p>
          ) : (
            likedAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Likes;
