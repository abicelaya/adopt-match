import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { IoArrowBack } from "react-icons/io5";

const ShelterRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const db = getFirestore(app);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    phone: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
      .required("El teléfono es obligatorio"),
    location: Yup.string().required("La ubicación es obligatoria"),
    registrationNumber: Yup.string().required("El número de registro es obligatorio"),
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
        const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await setDoc(doc(collection(db, "protectoras"), user.user.uid), {
          userId: user.user.uid,
          fullName: values.fullName,
          phone: values.phone,
          location: values.location,
          registrationNumber: values.registrationNumber,
          email: values.email,
        });
        navigate("/shelter-profile");
      } catch (error) {
        setError("Error al registrar: " + error.message);
      }
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-2xl text-celesteGrisaceo font-dmSerif mb-8">
              Empecemos con algunos datos:
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Nombre completo de la protectora"
                className="w-full p-3 rounded-lg border border-celesteGrisaceo"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-red-500">{formik.errors.fullName}</div>
              )}

              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                className="w-full p-3 rounded-lg border border-celesteGrisaceo"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500">{formik.errors.phone}</div>
              )}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-2xl text-celesteGrisaceo font-dmSerif mb-8">
              Un par de datos más:
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="location"
                placeholder="Ubicación"
                className="w-full p-3 rounded-lg border border-celesteGrisaceo"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500">{formik.errors.location}</div>
              )}

              <input
                type="text"
                name="registrationNumber"
                placeholder="Número de registro"
                className="w-full p-3 rounded-lg border border-celesteGrisaceo"
                value={formik.values.registrationNumber}
                onChange={formik.handleChange}
              />
              {formik.touched.registrationNumber && formik.errors.registrationNumber && (
                <div className="text-red-500">{formik.errors.registrationNumber}</div>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-2xl text-celesteGrisaceo font-dmSerif mb-8">
              Para finalizar tu registro:
            </h2>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg border border-celesteGrisaceo"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="w-full p-3 rounded-lg border border-celesteGrisaceo"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
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
        fieldsToValidate = ['fullName', 'phone'];
        break;
      case 2:
        fieldsToValidate = ['location', 'registrationNumber'];
        break;
      case 3:
        fieldsToValidate = ['email', 'password'];
        break;
      default:
        break;
    }

    fieldsToValidate.forEach(field => {
      formik.setFieldTouched(field, true);
    });

    const errors = await formik.validateForm();
    const hasErrors = fieldsToValidate.some(field => errors[field]);

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
    <div className="min-h-screen bg-celeste">
      <button onClick={handleBack} className="p-4 text-celesteGrisaceo">
        <IoArrowBack size={24} />
      </button>

      <div className="px-8 pt-12">
        {renderStep()}
        
        {error && <div className="text-red-500 mt-4">{error}</div>}

        <button
          onClick={handleNext}
          className="w-full bg-celesteGrisaceo text-celeste rounded-full py-3 mt-8"
        >
          {currentStep === 3 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};

export default ShelterRegister;