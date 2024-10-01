import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import AnimalBox from "../../components/AnimalBox/AnimalBox";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalsCollection = collection(db, "animales");
        let animalsQuery;

        if (user?.isShelter) {
          animalsQuery = query(
            animalsCollection,
            where("shelterId", "==", user.uid)
          );
        } else if (user) {
          animalsQuery = query(animalsCollection);
        } else {
          animalsQuery = query(animalsCollection);
        }

        const querySnapshot = await getDocs(animalsQuery);
        const animalsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnimals(animalsList);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los animales:", error);
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [db, user]);

  const handleSeeMoreAnimals = () => {
    navigate("/for-adoption");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Navbar />

      {loading ? (
        <p>Cargando animales...</p>
      ) : animals.length > 0 ? (
        <AnimalBox animals={animals} />
      ) : (
        <p>No hay animales registrados.</p>
      )}

      <button
        onClick={handleSeeMoreAnimals}
        className="mt-6 w-full bg-[#6dab71] text-white font-semibold py-3 rounded-lg transition duration-200 hover:bg-[#5ca861]"
      >
        Ver más animales
      </button>
    </div>
  );
};

export default Home;
