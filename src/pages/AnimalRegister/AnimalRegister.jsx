import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalRegisterAnimal/ModalRegisterAnimal";
import { IoArrowBack, IoArrowForward, IoCheckmark } from "react-icons/io5";

const AnimalRegister = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animalPhotoFile, setAnimalPhotoFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    animalType: Yup.string().required("El tipo de animal es obligatorio"),
    animalName: Yup.string().required("El nombre del animal es obligatorio"),
    animalAge: Yup.number()
      .required("La edad del animal es obligatoria")
      .min(0, "La edad debe ser mayor o igual a 0")
      .integer("La edad debe ser un número entero"),
    ageUnit: Yup.string()
      .oneOf(["meses", "años"])
      .required("El sexo es obligatorio"),
    sexo: Yup.string()
      .oneOf(["hembra", "macho"])
      .required("El sexo es obligatorio"),
    canLiveWithOthers: Yup.string().oneOf(["si", "no"]),
    space: Yup.string().oneOf(["si", "no"]),
    animalDescription: Yup.string().required(
      "La descripción del animal es obligatoria"
    ),
  });

  const formik = useFormik({
    initialValues: {
      animalType: "",
      animalName: "",
      animalAge: "",
      ageUnit: "años",
      canLiveWithOthers: "",
      space: "",
      animalPhoto: null,
      animalDescription: "",
      sexo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const animalData = {
        ...values,
        shelterId: user.uid,
        formattedAge: `${values.animalAge} ${values.ageUnit}`,
      };

      if (animalPhotoFile) {
        const photoURL = await uploadAnimalPhoto(animalPhotoFile);
        animalData.animalPhoto = photoURL;
      }

      registerAnimal(animalData);
    },
  });

  const uploadAnimalPhoto = async (file) => {
    try {
      const photoRef = ref(storage, `fotos animales/${file.name}`);
      await uploadBytes(photoRef, file);
      const photoURL = await getDownloadURL(photoRef);
      return photoURL;
    } catch (error) {
      console.error("Error al subir la foto: ", error);
      return null;
    }
  };

  const registerAnimal = async (animalData) => {
    try {
      const collectionRef = collection(db, "animales");
      const docRef = await addDoc(collectionRef, animalData);
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error al registrar el animal: ", error);
      setError("Error al registrar el animal: " + error.message);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.currentTarget.files[0];
    setAnimalPhotoFile(file);
    formik.setFieldValue("animalPhoto", file);
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

  const handleNext = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["animalType"];
        break;
      case 2:
        fieldsToValidate = ["animalName", "animalAge"];
        break;
      case 3:
        fieldsToValidate = ["sexo", "canLiveWithOthers", "space"];
        break;
      case 4:
        fieldsToValidate = ["animalDescription"];
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

  const renderStep = () => {
    const inputClasses =
      "w-full p-2  text-celesteGrisaceo border-b border-celesteGrisaceo/50 placeholder-celesteGrisaceo/60 bg-transparent focus:outline-none focus:border-celesteGrisaceo";

    const inputClassesStep1and4 =
      inputClasses + " placeholder-verdeOscuro/60 text-verdeOscuro";
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-4xl text-verdeOscuro font-dmSerif font-semibold mb-16">
              ¿Qué tipo de animal quieres registrar?
            </h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  const newValue =
                    formik.values.animalType === "Gato" ? "" : "Gato";
                  formik.setFieldValue("animalType", newValue);
                }}
                className={`w-full p-3 rounded-full border border-verdeOscuro ${
                  formik.values.animalType === "Gato"
                    ? "bg-verdeOscuro text-beige"
                    : "text-verdeOscuro"
                }`}
              >
                Gato
              </button>
              <button
                type="button"
                onClick={() => {
                  const newValue =
                    formik.values.animalType === "Perro" ? "" : "Perro";
                  formik.setFieldValue("animalType", newValue);
                }}
                className={`w-full p-3 rounded-full border border-verdeOscuro ${
                  formik.values.animalType === "Perro"
                    ? "bg-verdeOscuro text-beige"
                    : "text-verdeOscuro"
                }`}
              >
                Perro
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-4xl text-celesteGrisaceo font-dmSerif font-semibold mb-16">
              Datos del animal
            </h2>
            <div className="space-y-8">
              <input
                type="text"
                name="animalName"
                placeholder="Nombre del animal"
                className={inputClasses}
                value={formik.values.animalName}
                onChange={formik.handleChange}
              />
              {formik.touched.animalName && formik.errors.animalName && (
                <div className="text-gray-500 text-sm">
                  {formik.errors.animalName}
                </div>
              )}
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="animalAge"
                  placeholder="Edad del animal"
                  className={inputClasses}
                  value={formik.values.animalAge}
                  onChange={formik.handleChange}
                />
                <select
                  name="ageUnit"
                  className={`select select-ghost w-1/2 p-2 bg-transparent text-celesteGrisaceo/70 focus:outline-none focus:border-transparent`}
                  value={formik.values.ageUnit}
                  onChange={formik.handleChange}
                >
                  <option value="años">Años</option>
                  <option value="meses">Meses</option>
                </select>
              </div>
              {formik.touched.animalAge && formik.errors.animalAge && (
                <div className="text-gray-500 text-sm">
                  {formik.errors.animalAge}
                </div>
              )}
              {formik.touched.ageUnit && formik.errors.ageUnit && (
                <div className="text-gray-500 text-sm">
                  {formik.errors.ageUnit}
                </div>
              )}
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-4xl text-marron font-dmSerif font-semibold mb-7">
              Información para su adopción
            </h2>
            <div className="space-y-4">
              <h3 className="text-md text-marron">Sexo</h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    const newValue = formik.values.sexo === "hembra" ? "" : "hembra";
                    formik.setFieldValue("sexo", newValue);
                  }}
                  className={`w-full p-3 rounded-full border border-marron ${
                    formik.values.sexo === "hembra"
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
                >
                  Hembra
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newValue = formik.values.sexo === "macho" ? "" : "macho";
                    formik.setFieldValue("sexo", newValue);
                  }}
                  className={`w-full p-3 rounded-full border border-marron ${
                    formik.values.sexo === "macho"
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
                >
                  Macho
                </button>
              </div>
              <h3 className="text-md text-marron">¿Puede estar con otros animales?</h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    const newValue = formik.values.canLiveWithOthers === "si" ? "" : "si";
                    formik.setFieldValue("canLiveWithOthers", newValue);
                  }}
                  className={`w-full p-3 rounded-full border border-marron ${
                    formik.values.canLiveWithOthers === "si"
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newValue = formik.values.canLiveWithOthers === "no" ? "" : "no";
                    formik.setFieldValue("canLiveWithOthers", newValue);
                  }}
                  className={`w-full p-3 rounded-full border border-marron ${
                    formik.values.canLiveWithOthers === "no"
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
                >
                  No
                </button>
              </div>
              <h3 className="text-md text-marron">¿Necesita espacio abierto?</h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    const newValue = formik.values.space === "si" ? "" : "si";
                    formik.setFieldValue("space", newValue);
                  }}
                  className={`w-full p-3 rounded-full border border-marron ${
                    formik.values.space === "si"
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newValue = formik.values.space === "no" ? "" : "no";
                    formik.setFieldValue("space", newValue);
                  }}
                  className={`w-full p-3 rounded-full border border-marron ${
                    formik.values.space === "no"
                      ? "bg-marron text-beige"
                      : "text-marron"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-4xl text-verdeOscuro font-dmSerif font-semibold mb-12">
              Agrega una foto y una descripción
            </h2>
            <div className="space-y-8">
              <input
                type="file"
                id="animalPhoto"
                name="animalPhoto"
                className="file-input file-input-ghost w-full max-w-xs text-verdeOscuro border rounded-full bg-verdeOscuro/20" 
                onChange={handlePhotoChange}
              />
              <p className="text-verdeOscuro ">¿Es juguetón, tranquilo, curioso? Cuéntanos sobre su carácter y lo que le gusta.</p>
              <textarea
                id="animalDescription"
                name="animalDescription"
                placeholder="Descripción del animal"
                className="textarea textarea-bordered text-beige bg-verdeOscuro textarea-md w-full max-w-lg placeholder:text-beige/60"
                value={formik.values.animalDescription}
                onChange={formik.handleChange}
              />
              {formik.touched.animalDescription &&
                formik.errors.animalDescription && (
                  <div className="text-gray-500 text-sm">
                    {formik.errors.animalDescription}
                  </div>
                )}
            </div>
          </>
        );

      default:
        return null;
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
      <Modal
        isOpen={isModalOpen}
        title="¡Registro exitoso!"
        message="El animal ha sido registrado correctamente."
      />

      <div className="relative w-full h-full">
        <button onClick={handleBack} className={`p-8 ${getBackArrowColor()}`}>
          <IoArrowBack size={24} />
        </button>
      </div>

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

export default AnimalRegister;
