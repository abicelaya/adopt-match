import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { IoArrowBack, IoArrowForward, IoCheckmark } from "react-icons/io5";

const AdopterRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const db = getFirestore(app);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Campo requerido"),
    phone: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
      .required("Campo requerido"),
    email: Yup.string()
      .email("Email inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Campo requerido"),
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
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await setDoc(doc(collection(db, "adoptantes"), user.user.uid), {
          userId: user.user.uid,
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          animals: values.animals,
          home: values.home,
        });
        navigate("/home");
      } catch (error) {
        setError("Error al registrar: " + error.message);
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

  const getBackgroundColor = () => {
    switch (currentStep) {
      case 1:
        return "bg-verdeClaro";
      case 2:
        return "bg-celeste";
      case 3:
        return "bg-beige";
      case 4:
        return "bg-verdeClaro";
      default:
        return "bg-verdeClaro";
    }
  };

  const getBackArrowColor = () => {
    switch (currentStep) {
      case 1:
        return "text-verdeOscuro";
      case 2:
        return "text-celesteGrisaceo";
      case 3:
        return "text-marron";
      case 4:
        return "text-verdeOscuro";
      default:
        return "text-verdeOscuro";
    }
  };

  const getNextButtonStyles = () => {
    switch (currentStep) {
      case 1:
        return "bg-verdeOscuro text-verdeClaro";
      case 2:
        return "bg-celesteGrisaceo text-celeste";
      case 3:
        return "bg-marron text-beige";
      case 4:
        return "bg-verdeOscuro text-verdeClaro";
      default:
        return "bg-verdeOscuro text-verdeClaro";
    }
  };

  const renderStep = () => {
    const inputClasses =
      "w-full p-2 border-b border-celesteGrisaceo/50 bg-transparent focus:outline-none focus:border-celesteGrisaceo";
    const inputClassesStep1and4 =
      inputClasses + " placeholder-verdeOscuro/60 text-verdeOscuro";

    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-4xl text-verdeOscuro font-semibold font-dmSerif mb-16">
              Empecemos con algunos datos
            </h2>
            <div className="space-y-8">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nombre completo"
                  className={inputClassesStep1and4}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="text-gray-500 text-sm mt-1">
                    {formik.errors.fullName}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  className={inputClassesStep1and4}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-gray-500 text-sm mt-1">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-4xl text-celesteGrisaceo font-semibold font-dmSerif mb-16">
              ¿Tienes animales en casa?
            </h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleOptionChange("animals", "Gato")}
                className={`w-full p-3 rounded-full border border-celesteGrisaceo 
                  ${
                    formik.values.animals.includes("Gato")
                      ? "bg-celesteGrisaceo text-beige"
                      : "text-celesteGrisaceo"
                  }`}
              >
                Gato
              </button>
              <button
                type="button"
                onClick={() => handleOptionChange("animals", "Perro")}
                className={`w-full p-3 rounded-full border border-celesteGrisaceo 
                  ${
                    formik.values.animals.includes("Perro")
                      ? "bg-celesteGrisaceo text-beige"
                      : "text-celesteGrisaceo"
                  }`}
              >
                Perro
              </button>
              <p className="text-sm text-celesteGrisaceo/60 text-center mt-8">
                Si no tienes sigue con el registro.
              </p>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-4xl text-marron font-semibold font-dmSerif mb-16">
              ¿Tienes algún espacio abierto?
            </h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => handleOptionChange("home", "Balcón")}
                className={`w-full p-3 rounded-full border border-marron 
                  ${
                    formik.values.home.includes("Balcón")
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
              >
                Balcón
              </button>
              <button
                type="button"
                onClick={() => handleOptionChange("home", "Terraza")}
                className={`w-full p-3 rounded-full border border-marron 
                  ${
                    formik.values.home.includes("Terraza")
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
              >
                Terraza
              </button>
              <p className="text-sm text-marron/60 text-center mt-8">
                Si no tienes sigue con el registro.
              </p>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-4xl text-verdeOscuro font-semibold font-dmSerif mb-16">
              Para finalizar tu registro
            </h2>
            <div className="space-y-8">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputClassesStep1and4}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-gray-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className={inputClassesStep1and4}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-gray-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const handleNext = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "phone"];
        break;
      case 2:
        // No necesita validación, son opcionales
        setCurrentStep(currentStep + 1);
        return;
      case 3:
        // No necesita validación, son opcionales
        setCurrentStep(currentStep + 1);
        return;
      case 4:
        fieldsToValidate = ["email", "password"];
        break;
      default:
        break;
    }

    fieldsToValidate.forEach((field) => {
      formik.setFieldTouched(field, true);
    });

    const errors = await formik.validateForm();
    const hasErrors = fieldsToValidate.some((field) => errors[field]);

    if (!hasErrors) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        formik.handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className={`min-h-screen ${getBackgroundColor()} transition-colors duration-300`}
    >
      <button onClick={handleBack} className={`p-8 ${getBackArrowColor()}`}>
        <IoArrowBack size={24} />
      </button>

      <div className="px-14 pt-16">
        {renderStep()}

        {error && <div className="text-gray-500 mt-4">{error}</div>}

        <div className="fixed bottom-12 right-12">
          <button
            onClick={handleNext}
            className={`w-14 h-14 rounded-full ${getNextButtonStyles()} flex items-center justify-center`}
          >
            {currentStep === 4 ? (
              <IoCheckmark size={24} />
            ) : (
              <IoArrowForward size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdopterRegister;
