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
    <div className="flex flex-col h-screen m-0 relative bg-verdeClaro">
      <Navbar />
      <div className="flex flex-col items-center justify-start h-[44vh] px-0 pt-0">
        {/* Imagen del animal */}
        <div className="w-full h-full flex items-center justify-center z-0">
          <div className="w-full h-full rounded-none overflow-hidden">
            <img
              src={animal.animalPhoto}
              alt={animal.animalName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="text-left mt-4 mx-8">
        <h2 className="text-4xl text-verdeOscuro font-dmSerif font-bold flex">
          {animal.animalName}
          <span onClick={handleHeartClick} className="ml-auto cursor-pointer">
            {isFavorite ? (
              <IoHeart style={{ fontSize: "1.5rem" }} />
            ) : (
              <IoHeartOutline style={{ fontSize: "1.5rem" }} />
            )}
          </span>
        </h2>
        <span className="text-verdeOscuro">sexo</span>
      </div>
      {/* Sección detalle del animal */}
      <div className=" text-verdeOscuro px-8 w-full max-w-md flex flex-col ">
        <div>
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
          <h3 className="mt-8 font-semibold">Sobre mi</h3>
          <p className="text-center text-sm mt-3">{animal.animalDescription}</p>
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
      <div className="fixed bottom-3 w-full z-10 flex justify-center">
        <Menu />
      </div>
    </div>
  );
};

export default AnimalProfile;
