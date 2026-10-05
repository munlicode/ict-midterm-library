import React, { createContext, useContext, useState } from "react";
import type { Language } from "../i18n";

export type { Language };

interface AuthContextType {
  user: { name: string; email: string } | null;
  signIn: () => void;
  signOut: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  sessionHoursRemaining: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION_HOURS = 2; // 2 hours expiry demo limit

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: "Daniel",
    email: "daniel@astanait.edu.kz",
  });
  const [sessionStartTime, setSessionStartTime] = useState<number>(Date.now());
  const [lang, setLang] = useState<Language>("EN"); // default language

  const signIn = () => {
    setUser({ name: "Daniel", email: "daniel@astanait.edu.kz" });
    setSessionStartTime(Date.now());
  };

  const signOut = () => {
    setUser(null);
  };

  // Calculate remaining hours (capped nicely to 1 decimal place or whole integer for UI display)
  const sessionHoursRemaining = user
    ? Math.max(0, Number((SESSION_DURATION_HOURS - (Date.now() - sessionStartTime) / (1000 * 60 * 60)).toFixed(1)))
    : 0;

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, lang, setLang, sessionHoursRemaining }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
