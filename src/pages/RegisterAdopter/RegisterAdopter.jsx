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
        // Registra el usuario en Firebase

        // Crea el objeto adoptante
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

        // Navega a la página de inicio o donde desees después del registro
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

  // Función para registrar un usuario y guardar los datos del adoptante en Firestore
  const registerUser = async (email, password, adopterData) => {
    try {
      // Registramos al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Agregamos los datos del adoptante a Firestore utilizando el UID del usuario
      await addAdopterToFirestore({
        ...adopterData,
        uid: user.uid, // Guardamos el UID del usuario para identificarlo en Firestore
        // El resto de los datos del adoptante se pasan desde adopterData
      });

      console.log("Usuario y adoptante registrados correctamente.");
      return user;
    } catch (error) {
      throw new Error("Error en el registro del usuario: " + error.message);
    }
  };

  // Función para agregar los datos del adoptante a Firestore
  const addAdopterToFirestore = async (adopterData) => {
    try {
      const collectionRef = doc(collection(db, "adoptantes"), adopterData.uid);
      console.log("Adoptante agregado a Firestore:", adopterData);

      // Creamos o sobreescribimos el documento del adoptante utilizando su UID como ID
      await setDoc(collectionRef, {
        userId: adopterData.uid, // UID del usuario en Firebase Authentication
        nombreCompleto: adopterData.nombreCompleto,
        telefono: adopterData.telefono,
        email: adopterData.email,
        animales: adopterData.animales, // Lista de animales
        hogar: adopterData.hogar, // Información del hogar (terraza/balcón, etc.)
      });

      console.log("Adoptante agregado a Firestore:", adopterData);
    } catch (error) {
      throw new Error(
        "Error al agregar el adoptante a Firestore: " + error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Adoptante - Información personal
      </h1>
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
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
                ? "bg-green-600"
                : "bg-green-500"
            } hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Perro
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("animales", "Gato")}
            className={`${
              formik.values.animales.includes("Gato")
                ? "bg-green-600"
                : "bg-green-500"
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
                ? "bg-green-600"
                : "bg-green-500"
            } hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Terraza
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("hogar", "Balcón")}
            className={`${
              formik.values.hogar.includes("Balcón")
                ? "bg-green-600"
                : "bg-green-500"
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
            isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
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
