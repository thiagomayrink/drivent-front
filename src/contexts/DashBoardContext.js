import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DashboardContext = createContext();
export default DashboardContext;

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useLocalStorage(
    "dashboardData",
    {}
  );

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}
