import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { IoArrowBack } from "react-icons/io5";

const RegisterShelter = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const auth = getAuth(app);
  const db = getFirestore(app);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
      .required("El teléfono es obligatorio"),
    location: Yup.string().required("La ubicación es obligatoria"),
    registrationNumber: Yup.string().required(
      "El número de registro es obligatorio"
    ),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      location: "",
      registrationNumber: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      setSuccess("");
      try {
        const user = await registerUser(values.email, values.password);
        await addShelterToFirestore({ ...values, uid: user.uid });
        setSuccess("Protectora registrada con éxito");
        navigate("/shelter-profile");
      } catch (error) {
        setError("Error al registrar la protectora: " + error.message);
      }
    },
  });

  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw new Error("Error en el registro del usuario: " + error.message);
    }
  };

  const addShelterToFirestore = async (shelterData) => {
    try {
      const collectionRef = doc(collection(db, "protectoras"), shelterData.uid);
      await setDoc(collectionRef, {
        userId: shelterData.uid,
        fullName: shelterData.fullName,
        phone: shelterData.phone,
        location: shelterData.location,
        registrationNumber: shelterData.registrationNumber,
        email: shelterData.email,
      });
    } catch (error) {
      throw new Error(
        "Error al agregar la protectora a Firestore: " + error.message
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
        <button onClick={goBack} className="text-2xl text-white p-4 hover:text-green-300">
          <IoArrowBack />
        </button>
        <h1 className="text-3xl font-semibold text-white text-left pl-8 pt-[150px] z-10 relative">
          Protectora
        </h1>
        </div>

        
      </div>

      <div className="bg-white rounded-lg p-8 w-full max-w-md z-10 relative mb-5">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Ingresa tu nombre completo"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.errors.fullName && (
              <div className="text-red-500 text-sm">
                {formik.errors.fullName}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Ingresa tu teléfono"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Ingresa tu ubicación"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
            {formik.errors.location && (
              <div className="text-red-500 text-sm">
                {formik.errors.location}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              placeholder="Ingresa tu número de registro"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
            />
            {formik.errors.registrationNumber && (
              <div className="text-red-500 text-sm">
                {formik.errors.registrationNumber}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="mt-1 p-2 w-full border rounded-lg"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#6dab71] hover:bg-green-600 text-white font-semibold mt-8 py-2 rounded-lg w-full transition duration-200"
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterShelter;
