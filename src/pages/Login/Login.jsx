import React, { useState } from "react"; // Importar useState
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { loginUser } from "../../firebaseConfig"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [error, setError] = useState(null); // Estado para manejar el error
  const navigate = useNavigate(); // Hook para navegar entre páginas

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
      setError(null); // Limpiar el mensaje de error antes de intentar iniciar sesión

      try {
        // Llama a la función loginUser para autenticar al usuario
        await loginUser(values.email, values.password);
        // Si la autenticación es exitosa, redirigir a Home
        navigate("/home"); // Cambia "/home" por la ruta correcta si es necesario
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        // Establecer el mensaje de error en el estado
        setError(error.message); // Guardar el mensaje de error
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div> // Mostrar el mensaje de error si existe
      )}
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
          {formik.errors.email && (
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
          {formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default Login;
