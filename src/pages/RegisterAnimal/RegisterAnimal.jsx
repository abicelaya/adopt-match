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
    ageUnit: Yup.string().required().oneOf(["meses", "años"]),
    animalDescription: Yup.string().required(
      "La descripción del animal es obligatoria"
    ),
    canLiveWithOthers: Yup.string().oneOf(["si", "no"]),
    space: Yup.string().oneOf(["si", "no"]),
    sexo: Yup.string()
      .oneOf(["hembra", "macho"])
      .required("El sexo es obligatorio"),
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
      ageUnit: "años",
      sexo: "",
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

      const formattedAge = `${animalData.animalAge} ${animalData.ageUnit}`;

      const docRef = await addDoc(collectionRef, {
        ...animalData,
        formattedAge,
      });

      const animalId = docRef.id;

      await setDoc(
        docRef,
        {
          ...animalData,
          animalId: animalId,
          formattedAge,
        },
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

  const handleOptionChange = (field, value) => {
    const fieldValue = formik.values[field];
    if (fieldValue.includes(value)) {
      formik.setFieldValue(
        field,
        fieldValue.filter((item) => item !== value)
      );
    } else {
      formik.setFieldValue(field, [...fieldValue, value]);
    }
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
          <select
            id="animalType"
            name="animalType"
            className="mt-1 p-2 w-full border rounded-lg"
            value={formik.values.animalType}
            onChange={formik.handleChange}
          >
            <option value="">¿Qué animal es?</option>
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
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="animalAge"
              placeholder="Edad"
              className="border-b border-verdeOscuro bg-transparent w-1/2 p-2 focus:outline-none placeholder-verdeOscuro/60 text-verdeOscuro"
              value={formik.values.animalAge}
              onChange={formik.handleChange}
            />
            <select
              name="ageUnit"
              className="border-b border-verdeOscuro bg-transparent p-2 focus:outline-none text-verdeOscuro"
              value={formik.values.ageUnit}
              onChange={formik.handleChange}
            >
              <option value="meses">Meses</option>
              <option value="años">Años</option>
            </select>
          </div>
          {formik.touched.animalAge && formik.errors.animalAge && (
            <div className="text-gray-500 text-sm mt-1">
              {formik.errors.animalAge}
            </div>
          )}
        </div>

        {/* Sexo */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mt-4 text-gray-500">Sexo</h2>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => formik.setFieldValue("sexo", "hembra")}
              className={`bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg w-full transition duration-200 ${
                formik.values.sexo === "hembra" ? "bg-[#4d7950]" : ""
              }`}
            >
              Hembra
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldValue("sexo", "macho")}
              className={`bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg w-full transition duration-200 ${
                formik.values.sexo === "macho" ? "bg-[#4d7950]" : ""
              }`}
            >
              Macho
            </button>
          </div>
          {formik.touched.sexo && formik.errors.sexo && (
            <div className="text-gray-500 text-sm">{formik.errors.sexo}</div>
          )}
        </div>

        {/* ¿Puede estar con otros animales? */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mt-4 text-gray-500">
            ¿Puede estar con otros animales?
          </h2>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => formik.setFieldValue("canLiveWithOthers", "si")}
              className={`bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg w-full transition duration-200 ${
                formik.values.canLiveWithOthers === "si" ? "bg-[#4d7950]" : ""
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldValue("canLiveWithOthers", "no")}
              className={`bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg w-full transition duration-200 ${
                formik.values.canLiveWithOthers === "no" ? "bg-[#4d7950]" : ""
              }`}
            >
              No
            </button>
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
          <h2 className="text-lg font-semibold mt-4 text-gray-500">
            ¿Necesita espacio abierto?
          </h2>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => formik.setFieldValue("space", "si")}
              className={`bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg w-full transition duration-200 ${
                formik.values.space === "si" ? "bg-[#4d7950]" : ""
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldValue("space", "no")}
              className={`bg-[#6dab71] hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg w-full transition duration-200 ${
                formik.values.space === "no" ? "bg-[#4d7950]" : ""
              }`}
            >
              No
            </button>
          </div>
          {formik.touched.space && formik.errors.space && (
            <div className="text-red-500 text-sm">{formik.errors.space}</div>
          )}
        </div>

        {/* Descripción del animal */}
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

        {/* Foto del animal */}
        <div className="mb-4">
          <input
            type="file"
            id="animalPhoto"
            name="animalPhoto"
            className="mt-1 p-2 w-full border rounded-lg"
            onChange={handlePhotoChange}
          />
        </div>

        <button
          type="submit"
          className="bg-[#6dab71] text-white font-semibold py-2 rounded-lg w-full hover:bg-[#4d7950]"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterAnimal;
