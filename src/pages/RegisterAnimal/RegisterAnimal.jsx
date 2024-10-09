import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalRegisterAnimal/ModalRegisterAnimal";
import { IoArrowBack } from "react-icons/io5";

const RegisterAnimal = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animalPhotoFile, setAnimalPhotoFile] = useState(null);

  const validationSchema = Yup.object({
    animalType: Yup.string().required("El tipo de animal es obligatorio"),
    animalName: Yup.string().required("El nombre del animal es obligatorio"),
    animalAge: Yup.number()
      .required("La edad del animal es obligatoria")
      .min(0, "La edad debe ser mayor o igual a 0")
      .integer("La edad debe ser un número entero"),
    space: Yup.string().required(
      "Es necesario indicar si necesita espacio abierto"
    ),
    canLiveWithOthers: Yup.string().required(
      "Es necesario indicar si puede estar con otros animales"
    ),
    animalDescription: Yup.string().required(
      "La descripción del animal es obligatoria"
    ),
  });

  const formik = useFormik({
    initialValues: {
      animalType: "",
      animalName: "",
      animalAge: "",
      canLiveWithOthers: "",
      space: "",
      animalPhoto: null,
      animalDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const animalData = {
        ...values,
        shelterId: user.uid,
      };

      if (animalPhotoFile) {
        const photoURL = await uploadAnimalPhoto(animalPhotoFile);
        animalData.animalPhoto = photoURL;
      }

      registerAnimal(animalData);
    },
  });

  const uploadAnimalPhoto = async (file) => {
    try {
      const photoRef = ref(storage, `fotos animales/${file.name}`);
      await uploadBytes(photoRef, file);
      const photoURL = await getDownloadURL(photoRef);
      return photoURL;
    } catch (error) {
      console.error("Error al subir la foto: ", error);
      return null;
    }
  };

  const registerAnimal = async (animalData) => {
    try {
      const collectionRef = collection(db, "animales");

      const docRef = await addDoc(collectionRef, animalData);

      const animalId = docRef.id;

      await setDoc(
        docRef,
        { ...animalData, animalId: animalId },
        { merge: true }
      );

      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/shelter-profile");
      }, 2000);
    } catch (error) {
      console.error("Error al registrar el animal: ", error);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.currentTarget.files[0];
    setAnimalPhotoFile(file);
    formik.setFieldValue("animalPhoto", file);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-start justify-center h-screen">
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title="¡Registro exitoso!"
        message="El animal ha sido registrado correctamente."
      />

      <div className="relative w-full h-full">
        <div className="bg-[#6dab71] w-full h-full absolute top-0 left-0 rounded-lg"></div>
        <button
          onClick={goBack}
          className="text-2xl text-white absolute p-4 z-20"
        >
          <IoArrowBack />
        </button>
        <h1 className="text-3xl font-semibold text-white text-left pl-8 pt-[100px] z-10 relative">
          Registrar Animal
        </h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-lg p-8 w-full max-w-md space-y-4 mb-5"
      >
        {/* Tipo de animal */}
        <div className="mb-4">
          <label className="text-sm text-gray-600" htmlFor="animalType">
            Tipo de animal
          </label>
          <select
            id="animalType"
            name="animalType"
            className="mt-1 p-2 w-full border rounded-lg"
            value={formik.values.animalType}
            onChange={formik.handleChange}
          >
            <option value="">Selecciona un tipo</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
          {formik.touched.animalType && formik.errors.animalType && (
            <div className="text-red-500 text-sm">
              {formik.errors.animalType}
            </div>
          )}
        </div>

        {/* Nombre del animal */}
        <div className="mb-4">
          <input
            type="text"
            id="animalName"
            name="animalName"
            placeholder="Nombre del animal"
            className="mt-1 p-2 w-full border rounded-lg"
            value={formik.values.animalName}
            onChange={formik.handleChange}
          />
          {formik.touched.animalName && formik.errors.animalName && (
            <div className="text-red-500 text-sm">
              {formik.errors.animalName}
            </div>
          )}
        </div>

        {/* Edad del animal */}
        <div className="mb-4">
          <input
            type="number"
            id="animalAge"
            name="animalAge"
            placeholder="Edad del animal"
            className="mt-1 p-2 w-full border rounded-lg"
            value={formik.values.animalAge}
            onChange={formik.handleChange}
          />
          {formik.touched.animalAge && formik.errors.animalAge && (
            <div className="text-red-500 text-sm">
              {formik.errors.animalAge}
            </div>
          )}
        </div>

        {/* ¿Puede estar con otros animales? */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            ¿Puede estar con otros animales?
          </p>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="canLiveWithOthers"
                value="si"
                className="mr-2"
                checked={formik.values.canLiveWithOthers === "si"}
                onChange={formik.handleChange}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="canLiveWithOthers"
                value="no"
                className="mr-2"
                checked={formik.values.canLiveWithOthers === "no"}
                onChange={formik.handleChange}
              />
              No
            </label>
          </div>
          {formik.touched.canLiveWithOthers &&
            formik.errors.canLiveWithOthers && (
              <div className="text-red-500 text-sm">
                {formik.errors.canLiveWithOthers}
              </div>
            )}
        </div>

        {/* ¿Necesita espacio abierto? */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">¿Necesita espacio abierto?</p>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="space"
                value="si"
                className="mr-2"
                checked={formik.values.space === "si"}
                onChange={formik.handleChange}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="space"
                value="no"
                className="mr-2"
                checked={formik.values.space === "no"}
                onChange={formik.handleChange}
              />
              No
            </label>
          </div>
          {formik.touched.space && formik.errors.space && (
            <div className="text-red-500 text-sm">{formik.errors.space}</div>
          )}
        </div>

        {/* Foto del animal */}
        <div className="mb-4">
          <label className="text-sm text-gray-600" htmlFor="animalPhoto">
            Foto del animal
          </label>
          <input
            type="file"
            id="animalPhoto"
            name="animalPhoto"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 p-2 w-full border rounded-lg"
          />
          {formik.touched.animalPhoto && formik.errors.animalPhoto && (
            <div className="text-red-500 text-sm">
              {formik.errors.animalPhoto}
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <textarea
            id="animalDescription"
            name="animalDescription"
            placeholder="Descripción del animal"
            className="mt-1 p-2 w-full border rounded-lg"
            value={formik.values.animalDescription}
            onChange={formik.handleChange}
          />
          {formik.touched.animalDescription &&
            formik.errors.animalDescription && (
              <div className="text-red-500 text-sm">
                {formik.errors.animalDescription}
              </div>
            )}
        </div>

        <button
          type="submit"
          className="bg-[#6dab71] text-white rounded-lg px-4 py-2 w-full"
        >
          Registrar Animal
        </button>
      </form>
    </div>
  );
};

export default RegisterAnimal;
