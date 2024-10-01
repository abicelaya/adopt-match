import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterAnimal = () => {  
  const navigate = useNavigate();
  const db = getFirestore();
  const {user} = useAuth();
  console.log(user);

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
    animalDescription: Yup.string().required(
      "La descripción del animal es obligatoria"
    ),
  });

  const formik = useFormik({
    initialValues: {
      animalType: "",
      animalName: "",
      animalAge: "",
      animalHealth: "",
      space: "",
      animalPhoto: null,
      animalDescription: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const animalData = {
        ...values,
        shelterId: user.uid,  
      };
      await registerAnimal(animalData);
    },
  });

  const registerAnimal = async (animalData) => {
    try {
      const collectionRef = collection(db, "animales");
      await addDoc(collectionRef, animalData);
      console.log("Animal registrado con éxito");
      navigate("/shelter-profile"); // Redirige a la página profile-shelter
    } catch (error) {
      console.error("Error al registrar el animal: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Registrar Animal
        </h1>

        <form onSubmit={formik.handleSubmit}>
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
            {formik.errors.animalType && (
              <div className="text-red-500 text-sm">
                {formik.errors.animalType}
              </div>
            )}
          </div>

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
            {formik.errors.animalName && (
              <div className="text-red-500 text-sm">
                {formik.errors.animalName}
              </div>
            )}
          </div>

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
            {formik.errors.animalAge && (
              <div className="text-red-500 text-sm">
                {formik.errors.animalAge}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600" htmlFor="animalHealth">
              Salud (opcional)
            </label>
            <select
              id="animalHealth"
              name="animalHealth"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.animalHealth}
              onChange={formik.handleChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="esterilizado">Esterilizado</option>
              <option value="VIF">VIF</option>
              <option value="VLFe">VLFe</option>
            </select>
          </div>

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
            {formik.errors.space && (
              <div className="text-red-500 text-sm">{formik.errors.space}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600" htmlFor="animalPhoto">
              Sube una foto del animal (opcional)
            </label>
            <input
              type="file"
              id="animalPhoto"
              name="animalPhoto"
              className="mt-1 p-2 w-full border rounded-lg"
              onChange={(event) => {
                formik.setFieldValue("animalPhoto", event.target.files[0]);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              className="text-sm text-gray-600"
              htmlFor="animalDescription"
            >
              Breve descripción del animal
            </label>
            <textarea
              id="animalDescription"
              name="animalDescription"
              rows="4"
              placeholder="Escribe una breve descripción"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.animalDescription}
              onChange={formik.handleChange}
            />
            {formik.errors.animalDescription && (
              <div className="text-red-500 text-sm">
                {formik.errors.animalDescription}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Registrar Animal
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAnimal;
