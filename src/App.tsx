import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SignInPage } from "./pages/SignInPage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { BookPage } from "./pages/BookPage";
import { ExpiredPage } from "./pages/ExpiredPage";
import { AboutPage } from "./pages/About";

import { AppLayout } from "./components/Layout";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/expired" replace />;
  }
  return <>{children}</>;
};

export function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          {/* Authenticated pages share the sidebar layout. Add new pages here. */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Route>
          {/* Public pages: same layout, no sign-in required. */}
          <Route element={<AppLayout />}>
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="/expired" element={<ExpiredPage />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
