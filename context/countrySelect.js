// CountryContext.js
import React, { createContext, useContext, useState } from "react";

const CountryContext = createContext();

export const useCountry = () => {
  return useContext(CountryContext);
};

export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    value: "unitedStates",
    placeId: "f719fcd7bc333af4b3d78d0e65893e5e",
  });

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
