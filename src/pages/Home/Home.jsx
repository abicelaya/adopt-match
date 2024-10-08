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

  return (
    <div className="flex flex-col items-center p-4 min-h-screen ">
      <Navbar />

      <div className="w-full max-w-4xl mt-6 mb-6 text-left">
        <h2 className="text-3xl font-semibold text-[#4b764e]">
          Un hogar,
          <br />
          una nueva historia.
        </h2>
      </div>

      <div className="mt-6 w-full max-w-4xl text-gray-500">
        {loading ? (
          <p>Cargando animales...</p>
        ) : animals.length > 0 ? (
          <AnimalBox animals={animals} />
        ) : (
          <p>No hay animales registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
