import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom"; 

const RegisterShelter = () => {
  const navigate = useNavigate(); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
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
      try {
        await registerUser(values.email, values.password);
        setSuccess("Usuario registrado con éxito");
        setError("");

        navigate("/shelter-profile");
      } catch (error) {
        setError("Error al registrar el usuario: " + error.message);
        setSuccess("");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Protectora</h1>

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
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterShelter;
