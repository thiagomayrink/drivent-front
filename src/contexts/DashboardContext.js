import { createContext, useState } from "react";

const DashboardContext = createContext();
export default DashboardContext;

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useState({});

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}
