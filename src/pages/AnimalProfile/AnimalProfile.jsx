import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import Menu from "../../components/Menu/Menu";

const AnimalProfile = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const db = getFirestore();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleHeartClick = () => {
    setIsFavorite(!isFavorite);
  };

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
    <div className="relative bg-verdeClaro min-h-screen">
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Imagen */}
      <div className="absolute top-0 left-0 w-full h-[50vh] z-0">
        <img
          src={animal.animalPhoto}
          alt={animal.animalName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 pt-[33vh] pb-20">
        <div className="text-left mx-8">
          <h2 className="text-4xl text-beige font-dmSerif font-bold flex">
            {animal.animalName}
            <span onClick={handleHeartClick} className="ml-auto cursor-pointer">
              {isFavorite ? (
                <IoHeart style={{ fontSize: "1.5rem" }} />
              ) : (
                <IoHeartOutline style={{ fontSize: "1.5rem" }} />
              )}
            </span>
          </h2>
          <span className="text-beige">sexo</span>
        </div>

        {/* Sección detalle del animal */}
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-8 mt-4">
          <div className="w-full max-w-md">
            <div className="flex justify-center mt-8 space-x-4">
              <span className="flex flex-col justify-center items-center w-1/3 border border-marron py-1 px-4 rounded-full text-sm text-center">
                {animal.animalAge} años
              </span>
              <span className="flex flex-col justify-center items-center w-1/3 border border-marron py-1 px-4 rounded-full text-sm text-center">
                {animal.canLiveWithOthers === "si" ? "Amistoso" : "Solitario"}
              </span>
              <span className="flex flex-col justify-center items-center w-1/3 border border-marron py-1 px-4 rounded-full text-sm text-center">
                {animal.space === "si" ? "Zona Exterior" : "Zona Interior"}
              </span>
            </div>

            {/* Descripción */}

            <p className="text-center text-md mt-6">
              {animal.animalDescription}
            </p>
          </div>

          {/* Botones */}
          <div className="flex space-x-8 justify-center mt-6">
            {user && !user.isShelter && (
              <button
                onClick={handleLike}
                className="bg-verdeOscuro/80 text-beige py-3 px-4 w-full max-w-[160px] border-verdeOscuro rounded-full"
              >
                Conocerme
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AnimalProfile;
