import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const RegisterAdopter = () => {
  const [registerError, setRegisterError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const validationSchema = Yup.object({
    nombreCompleto: Yup.string().required("El nombre completo es obligatorio"),
    telefono: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
      .required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    animales: Yup.array().of(Yup.string()),
    hogar: Yup.array().of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      nombreCompleto: "",
      telefono: "",
      email: "",
      password: "",
      animales: [],
      hogar: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Valores de Formik:", values);

      setIsSubmitting(true);
      try {
        const adopterData = {
          nombreCompleto: values.nombreCompleto,
          telefono: values.telefono,
          email: values.email,
          animales: values.animales,
          hogar: values.hogar,
        };

        const user = await registerUser(
          values.email,
          values.password,
          adopterData
        );
        console.log("Usuario registrado correctamente:", user);

        console.log("Datos del adoptante:", adopterData);

        navigate("/home");
      } catch (error) {
        console.error("Error en el registro:", error);
        setRegisterError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

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

  const registerUser = async (email, password, adopterData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addAdopterToFirestore({
        ...adopterData,
        uid: user.uid,
      });

      console.log("Usuario y adoptante registrados correctamente.");
      return user;
    } catch (error) {
      throw new Error("Error en el registro del usuario: " + error.message);
    }
  };

  const addAdopterToFirestore = async (adopterData) => {
    try {
      const collectionRef = doc(collection(db, "adoptantes"), adopterData.uid);
      console.log("Adoptante agregado a Firestore:", adopterData);

      await setDoc(collectionRef, {
        userId: adopterData.uid,
        nombreCompleto: adopterData.nombreCompleto,
        telefono: adopterData.telefono,
        email: adopterData.email,
        animales: adopterData.animales,
        hogar: adopterData.hogar,
      });

      console.log("Adoptante agregado a Firestore:", adopterData);
    } catch (error) {
      throw new Error(
        "Error al agregar el adoptante a Firestore: " + error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-start justify-center h-screen ">
      <div className="relative w-full h-full">
        <div className="bg-[#6dab71] w-full h-full absolute top-0 left-0 rounded-lg z-[-1]"></div>

        <h1 className="text-3xl font-semibold text-white text-left pl-8 pt-[150px] z-10 relative">
          Adoptante
        </h1>
      </div>
      <form
        className="bg-white rounded-lg p-8 w-full max-w-md space-y-4 mb-5"
        onSubmit={formik.handleSubmit}
      >
        {/* Nombre completo */}
        <input
          type="text"
          name="nombreCompleto"
          placeholder="Nombre completo"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={formik.values.nombreCompleto}
          onChange={formik.handleChange}
        />
        {formik.errors.nombreCompleto && (
          <div className="text-red-500 text-sm">
            {formik.errors.nombreCompleto}
          </div>
        )}

        {/* Teléfono */}
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={formik.values.telefono}
          onChange={formik.handleChange}
        />
        {formik.errors.telefono && (
          <div className="text-red-500 text-sm">{formik.errors.telefono}</div>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        {/* Contraseña */}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        {/* Opciones adicionales: Animales y Características del hogar */}
        <h2 className="text-lg font-semibold mt-4">
          ¿Tienes animales en casa?
        </h2>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => handleOptionChange("animales", "Perro")}
            className={`${
              formik.values.animales.includes("Perro")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Perro
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("animales", "Gato")}
            className={`${
              formik.values.animales.includes("Gato")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Gato
          </button>
        </div>

        <h2 className="text-lg font-semibold">Características del hogar</h2>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => handleOptionChange("hogar", "Terraza")}
            className={`${
              formik.values.hogar.includes("Terraza")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Terraza
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("hogar", "Balcón")}
            className={`${
              formik.values.hogar.includes("Balcón")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Balcón
          </button>
        </div>

        {registerError && (
          <div className="text-red-500 text-sm text-center">
            {registerError}
          </div>
        )}

        <button
          type="submit"
          className={`${
            isSubmitting ? "bg-gray-400" : "bg-[#6dab71] hover:bg-green-600"
          } text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterAdopter;
