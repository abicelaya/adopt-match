import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Datos del formulario:", values);
      setError(null);

      try {
        await loginUser(values.email, values.password);

        navigate("/home");
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);

        setError(error.message);
      }
    },
  });

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#6dab71] p-4 relative">
      <button
        onClick={goBack}
        className="absolute top-0 left-0 m-4 text-2xl text-white p-4 hover:text-green-300"
      >
        <IoArrowBack />
      </button>
      <h1 className="text-2xl text-left text-white font-semibold mb-8">
        Iniciar sesión
      </h1>
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <div className="mb-4">
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
        </div>

        <div className="mb-4">
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
        </div>

        <button
          type="submit"
          className="w-full bg-[#6dab71] hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Aceptar
        </button>
      </form>

      {/* Mensaje de registro */}
      <p className="mt-5 text-gray-800 text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-white font-semibold">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
};

export default Login;
