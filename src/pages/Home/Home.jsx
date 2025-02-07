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
import Lottie from 'lottie-react';
import emptyAnimation from '../../animations/gatoAnimacion.json';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-beige flex-col items-center min-h-screen overflow-x-hidden">
      <div className="w-full bg-beige z-10 ">
        <Navbar />

        <div className="w-full max-w-[80rem] px-6  mx-auto">
          <h2 className="text-[1.3rem] text-center  font-dmSerif  font-semibold text-marron">
            Adoptar es cambiar una vida
          </h2>
        </div>
        <div className="w-full max-w-[80rem] mx-auto px-6 flex items-center gap-4 my-4">
          <div className="h-[2px] flex-grow bg-marron/20"></div>
        </div>
      </div>

      <div className="mt-2 w-full max-w-[80rem] text-marron px-4">
        {loading ? (
          <p>Cargando animales...</p>
        ) : user?.isShelter && animals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="h-48 w-48 mb-8">
              <Lottie 
                animationData={emptyAnimation}
                loop={true}
                style={{ height: '100%' }}
              />
            </div>
            <p className="text-marron text-center font-dmSerif text-2xl mb-8">
              ¡Aún no has agregado ningún animal!
              
            </p>
            
          </div>
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
