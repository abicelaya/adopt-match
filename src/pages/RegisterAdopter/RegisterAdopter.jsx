import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../firebaseConfig";

const RegisterAdopter = () => {
  const [registerError, setRegisterError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    nombreCompleto: Yup.string().required("El nombre completo es obligatorio"),
    telefono: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 10 dígitos")
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
      setIsSubmitting(true);
      try {
        await registerUser(values.email, values.password);
        console.log("Usuario registrado correctamente:", values);
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
