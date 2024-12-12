import React, { useEffect, useState } from "react";
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
import Menu from "../../components/Menu/Menu";

const Home = () => {
  const { user } = useAuth();
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
    <div className="flex bg-beige flex-col items-center min-h-screen">
      <div className="fixed top-0 w-full bg-beige z-10 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
        <Navbar />
        <div>
          <div className="w-full max-w-[80rem] px-5 mx-auto flex justify-between gap-4 py-3">
            <button className="flex-1 bg-beige text-marron border border-marron py-1 px-4 rounded-full font-poppins hover:bg-[#b3c49b] transition-all duration-300">
              Perros
            </button>
            <button className="flex-1 bg-beige text-marron border border-marron py-1 px-4 rounded-full font-poppins hover:bg-[#b3c49b] transition-all duration-300">
              Gatos
            </button>
            <button className="flex-1 bg-beige text-marron border border-marron py-1 px-4 rounded-full font-poppins hover:bg-[#b3c49b] transition-all duration-300">
              Todos
            </button>
          </div>
        </div>
        <div className="w-full max-w-[80rem] px-6  mx-auto">
          <h2 className="text-[1.5rem]  font-dmSerif  font-semibold text-marron">
            Un hogar,
            <br />
            una nueva historia.
          </h2>
        </div>
      </div>

      <div className="mt-[14rem] w-full max-w-[80rem] text-marron px-4">
        {loading ? (
          <p>Cargando animales...</p>
        ) : animals.length > 0 ? (
          <AnimalBox animals={animals} />
        ) : (
          <p>No hay animales registrados.</p>
        )}
      </div>
      <div className="fixed bottom-3 w-full z-10 flex justify-center">
        <Menu />
      </div>
    </div>
  );
};

export default Home;
