import React, { createContext, useState, useEffect } from "react";
import sheltersData from "../data/shelters.json";

export const SheltersContext = createContext();

export const ShelterProvider = ({ children }) => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    setShelters(sheltersData);
  }, []);

  return (
    <SheltersContext.Provider value={{ shelters }}>
      {children}
    </SheltersContext.Provider>
  );
};
