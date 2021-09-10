import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const DashboardContext = createContext({ subscriptionDone: false });
export default DashboardContext;

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useLocalStorage(
    "dashboardData",
    { subscriptionDone: false }
  );

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}
