import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

const AdoptionProcess = () => {
  return (
    <div className="flex flex-col h-screen m-4">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-semibold text-[#6dab71] mb-6">
          Proceso de Adopción
        </h1>

        <h2 className="text-lg font-semibold text-gray-500 mb-4 ">
          Estas son pautas generales aplicables al proceso de adopción, pero es
          importante tener en cuenta que cada protectora puede tener sus propias
          normas específicas.
        </h2>
        <hr className="border-t-2 border-gray-300 mb-8" />
        <div className="space-y-4">
          <p className="text-lg text-gray-500">
            <span className="font-semibold text-[#6dab71]">
              Requisitos legales:
            </span>{" "}
            Para la adopción es necesario ser mayor de edad y firmar un contrato
            de adopción. El contrato estará a nombre del adoptante, firmado
            personalmente en el momento de la entrega del animal, previa
            comprobación del DNI.
          </p>

          <p className="text-lg text-gray-500">
            <span className="font-semibold text-[#6dab71]">
              Presencia del adoptante:
            </span>{" "}
            No se entregarán animales a nombre de otra persona, el propietario
            debe estar presente en el momento de la firma.
          </p>

          <p className="text-lg text-gray-500">
            <span className="font-semibold text-[#6dab71]">
              Protección del hogar:
            </span>{" "}
            Toda la vivienda debe estar protegida para evitar posibles caídas o
            pérdidas. Esto incluye ventanas, balcones, y terrazas.
          </p>

          <p className="text-lg text-gray-500">
            <span className="font-semibold text-[#6dab71]">
              Visitas previas:
            </span>{" "}
            Los adoptantes deben visitar al animal antes de la adopción para
            asegurarse de que son compatibles y están preparados para la
            responsabilidad.
          </p>

          <p className="text-lg text-gray-500">
            <span className="font-semibold text-[#6dab71]">
              Compromiso económico:
            </span>{" "}
            El adoptante debe estar preparado para asumir los gastos de
            alimentación, cuidados veterinarios y otros gastos que garanticen el
            bienestar del animal.
          </p>

          <p className="text-lg text-gray-500">
            <span className="font-semibold text-[#6dab71]">
              Revisión veterinaria:
            </span>{" "}
            Todos los animales se entregarán con una revisión veterinaria
            completa, que incluye vacunación y desparasitación.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdoptionProcess;
