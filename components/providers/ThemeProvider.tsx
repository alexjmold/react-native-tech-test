import { createContext, ReactNode, useContext } from "react";

import { ApplicationTheme } from "@/types";

interface ThemeProviderProps {
  children: ReactNode;
  theme: ApplicationTheme;
}

const ThemeContext = createContext<ApplicationTheme | undefined>(undefined);

export default function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): ApplicationTheme => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Theme must be provided within the ThemeProvider");
  }

  return context;
};
