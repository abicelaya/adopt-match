import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const AnimalProfile = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const db = getFirestore();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const animalRef = doc(db, "animales", id);
        const animalSnap = await getDoc(animalRef);

        if (animalSnap.exists()) {
          setAnimal(animalSnap.data());
        } else {
          console.log("No se encontró el animal");
        }
      } catch (error) {
        console.error("Error al obtener los datos del animal: ", error);
      }
    };

    fetchAnimalData();
  }, [id, db]);

  const handleLike = async () => {
    if (!animal || !user) return;

    try {
      const likeData = {
        animalId: animal.animalId,
        animalName: animal.animalName,
        animalPhoto: animal.animalPhoto,
        adopterId: user.uid,
        shelterId: animal.shelterId,
        timestamp: new Date(),
      };

      const likeRef = doc(db, "likes", `${user.uid}_${animal.animalId}`);
      await setDoc(likeRef, likeData);
      console.log("Animal guardado en likes:", likeData);
      navigate("/likes");
    } catch (error) {
      console.error("Error al guardar el animal en likes: ", error);
    }
  };

  if (!animal) {
    return <div className="text-gray-500">Cargando...</div>;
  }

  return (
    <div className="flex flex-col h-screen m-4">
      <Navbar />
      <div className="flex flex-col items-center justify-between flex-grow px-4 pt-4">
        {/* Imagen del animal */}
        <div className="relative flex flex-col items-center mb-4">
          <div className="w-[300px] h-[320px] rounded-3xl border-4 border-[#bfdfc2] flex items-center justify-center">
            <div className="w-[280px] h-[300px] rounded-3xl overflow-hidden border-4 border-[#6dab71]">
              <img
                src={animal.animalPhoto}
                alt={animal.animalName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-2xl text-[#4d7950] font-bold mt-4 text-center">
            {animal.animalName}
          </h2>
        </div>

        {/* Sección verde con detalles */}
        <div className="bg-[#6dab71] text-white p-8 rounded-t-3xl w-full max-w-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between mb-4">
              {/* Edad */}
              <div className="flex flex-col items-center w-1/3">
                <span className="text-sm">Edad</span>
                <span className="font-semibold text-center">
                  {animal.animalAge} años
                </span>
              </div>
              {/* Otros Animales */}
              <div className="flex flex-col items-center w-1/3">
                <span className="text-sm text-center">Otros Animales</span>
                <span className="font-semibold text-center">
                  {animal.canLiveWithOthers === "si" ? "Sí" : "No"}
                </span>
              </div>
              {/* Espacio Abierto */}
              <div className="flex flex-col items-center w-1/3">
                <span className="text-sm text-center">Espacio Abierto</span>
                <span className="font-semibold text-center">
                  {animal.space === "si" ? "Sí" : "No"}
                </span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-center text-sm mt-6">
              {animal.animalDescription}
            </p>
          </div>

          {/* Botones */}
          <div className="flex space-x-8 justify-center mt-6">
            {user && !user.isShelter && (
              <button
                onClick={handleLike}
                className="bg-white text-[#6dab71] hover:text-[#4d7950] font-semibold py-2 px-4 rounded-lg transition duration-200 w-full max-w-[160px]"
              >
                Conocer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfile;
