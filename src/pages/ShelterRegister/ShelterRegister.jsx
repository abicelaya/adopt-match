import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { IoArrowBack, IoArrowForward, IoCheckmark } from "react-icons/io5";

const ShelterRegister = () => {
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
    location: Yup.string().required("Campo requerido"),
    registrationNumber: Yup.string().required(
      "Campo requerido"
    ),
    email: Yup.string()
      .email("Email inválido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Campo requerido"),
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
        const user = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await setDoc(doc(collection(db, "protectoras"), user.user.uid), {
          userId: user.user.uid,
          fullName: values.fullName,
          phone: values.phone,
          location: values.location,
          registrationNumber: values.registrationNumber,
          email: values.email,
          isShelter: true,
        });
        navigate("/home");
      } catch (error) {
        setError("Error al registrar: " + error.message);
      }
    },
  });

  const getBackgroundColor = () => {
    switch (currentStep) {
      case 1:
        return "bg-verdeClaro";
      case 2:
        return "bg-celeste";
      case 3:
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
        return "bg-verdeOscuro text-verdeClaro";
      default:
        return "bg-verdeOscuro text-verdeClaro";
    }
  };

  const renderStep = () => {
    const inputClasses =
      "w-full p-2 border-b border-celesteGrisaceo/50 bg-transparent focus:outline-none focus:border-celesteGrisaceo";
    const inputClassesStep1and3 = inputClasses + " placeholder-verdeOscuro/60";
    const inputClassesStep2 = inputClasses + " placeholder-celesteGrisaceo/60";

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
                  placeholder="Nombre completo de la protectora"
                  className={inputClassesStep1and3}
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
                  className={inputClassesStep1and3}
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
              Un par de datos más
            </h2>
            <div className="space-y-8">
              <input
                type="text"
                name="location"
                placeholder="Ubicación"
                className={inputClassesStep2}
                value={formik.values.location}
                onChange={formik.handleChange}
              />
              <input
                type="text"
                name="registrationNumber"
                placeholder="Número de registro"
                className={inputClassesStep2}
                value={formik.values.registrationNumber}
                onChange={formik.handleChange}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-4xl text-verdeOscuro font-semibold font-dmSerif mb-16">
              Para finalizar tu registro
            </h2>
            <div className="space-y-8">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={inputClassesStep1and3}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className={inputClassesStep1and3}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
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
        fieldsToValidate = ["location", "registrationNumber"];
        break;
      case 3:
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
      if (currentStep < 3) {
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
            {currentStep === 3 ? (
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

export default ShelterRegister;
