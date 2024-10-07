import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import AnimalCard from "../../components/AnimalCard/AnimalCard";

const Likes = () => {
  const [likedAnimals, setLikedAnimals] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchLikedAnimals = async () => {
      try {
        const likesCollectionRef = collection(db, "likes");
        const likesSnapshot = await getDocs(likesCollectionRef);
        const likesList = likesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLikedAnimals(likesList);
      } catch (error) {
        console.error("Error al obtener los animales guardados:", error);
      }
    };

    fetchLikedAnimals();
  }, [db]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow px-4 ">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-4xl font-semibold text-[#6dab71] mb-6">
            Animales por conocer
          </h1>
        </div>

        <div className="flex flex-col items-center">
          {likedAnimals.length === 0 ? (
            <p>No has conocido ningún animal aún.</p>
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
