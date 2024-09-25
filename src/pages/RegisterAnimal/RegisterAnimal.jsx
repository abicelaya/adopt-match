import React from "react";

const RegisterAnimal = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Registrar Animal
        </h1>

        <form>
          <div className="mb-4">
            <label className="text-sm text-gray-600" htmlFor="animalType">
              Tipo de animal
            </label>
            <select
              id="animalType"
              className="mt-1 p-2 w-full border rounded-lg"
            >
              <option value="">Selecciona un tipo</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="animalName"
              placeholder="Nombre del animal"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              id="animalAge"
              placeholder="Edad del animal"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600" htmlFor="animalHealth">
              Salud
            </label>
            <select
              id="animalHealth"
              className="mt-1 p-2 w-full border rounded-lg"
            >
              <option value="">Selecciona una opción</option>
              <option value="esterilizado">Esterilizado</option>
              <option value="VIF">VIF</option>
              <option value="VLFe">VLFe</option>
            </select>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">¿Necesita espacio abierto?</p>
            <div className="flex space-x-4">
              <label>
                <input type="radio" name="space" value="si" className="mr-2" />
                Sí
              </label>
              <label>
                <input type="radio" name="space" value="no" className="mr-2" />
                No
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600" htmlFor="animalPhoto">
              Sube una foto del animal
            </label>
            <input
              type="file"
              id="animalPhoto"
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              className="text-sm text-gray-600"
              htmlFor="animalDescription"
            >
              Breve descripción del animal
            </label>
            <textarea
              id="animalDescription"
              rows="4"
              placeholder="Escribe una breve descripción"
              className="mt-1 p-2 w-full border rounded-lg"
            />
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

export default RegisterAnimal;
