import { createContext, useContext, useMemo, useEffect } from "react";
import useLocalStorage from "./useStorage.jsx";

const SimulationContext = createContext({});

export const SimulationProvider = ({ children }) => {
  const [simulations, setSimulations] = useLocalStorage("JWT", null);

  const persistSimulations = async (data) => {
    setSimulations(data);
  };

  const value = useMemo(
    () => ({
      simulations,
      persistSimulations,
    }),
    [simulations]
  );
  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulations = () => {
  return useContext(SimulationContext);
};
