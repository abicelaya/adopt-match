import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { IoArrowBack } from "react-icons/io5";

const RegisterAdopter = () => {
  const [registerError, setRegisterError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
      .required("El teléfono es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    animals: Yup.array().of(Yup.string()),
    home: Yup.array().of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      animals: [],
      home: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Valores de Formik:", values);

      setIsSubmitting(true);
      try {
        const adopterData = {
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          animals: values.animals,
          home: values.home,
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
        fullName: adopterData.fullName,
        phone: adopterData.phone,
        email: adopterData.email,
        animals: adopterData.animals,
        home: adopterData.home,
      });

      console.log("Adoptante agregado a Firestore:", adopterData);
    } catch (error) {
      throw new Error(
        "Error al agregar el adoptante a Firestore: " + error.message
      );
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-start justify-center h-screen pb-4">
      <div className="relative w-full h-full">
        <div className="bg-[#6dab71] w-full h-full absolute top-0 left-0 rounded-lg ">
          <button onClick={goBack} className="text-2xl text-white p-4">
            <IoArrowBack />
          </button>
          <h1 className="text-3xl font-semibold text-white text-left pl-8 pt-[150px] z-10 relative">
            Protectora
          </h1>
        </div>
      </div>
      <form
        className="bg-white rounded-lg p-8 w-full max-w-md space-y-4 mb-5"
        onSubmit={formik.handleSubmit}
      >
        {/* Nombre completo */}
        <input
          type="text"
          name="fullName"
          placeholder="Nombre completo"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
        )}

        {/* Teléfono */}
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm">{formik.errors.phone}</div>
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
        {formik.touched.email && formik.errors.email && (
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
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}

        {/* Opciones adicionales: Animales y Características del hogar */}
        <h2 className="text-lg font-semibold mt-4">
          ¿Tienes animales en casa?
        </h2>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => handleOptionChange("animals", "Perro")}
            className={`${
              formik.values.animals.includes("Perro")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Perro
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("animals", "Gato")}
            className={`${
              formik.values.animals.includes("Gato")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Gato
          </button>
        </div>

        <h2 className="text-lg font-semibold">Características del hogar</h2>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => handleOptionChange("home", "Terraza")}
            className={`${
              formik.values.home.includes("Terraza")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
          >
            Terraza
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange("home", "Balcón")}
            className={`${
              formik.values.home.includes("Balcón")
                ? "bg-[#6dab71]"
                : "bg-[#6dab71]"
            } hover:bg-[#4d7950] text-white font-semibold py-2 rounded-lg transition duration-200 w-full`}
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
            isSubmitting ? "bg-gray-400" : "bg-[#6dab71] hover:bg-[#4d7950]"
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
