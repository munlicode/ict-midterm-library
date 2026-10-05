import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../i18n";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { TooltipProvider } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { AppSidebar } from "./app-sidebar";

/**
 * Shared shell for all authenticated pages:
 * sidebar + slim header + page content (via <Outlet />) + footer.
 */
export const AppLayout: React.FC = () => (
  <TooltipProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background min-h-svh flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  </TooltipProvider>
);

/** Slim header: menu trigger, brand (mobile only) and language switch. */
export const Header: React.FC = () => {
  const { t, lang, nextLang } = useTranslation();

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-white/90 backdrop-blur px-4">
      <SidebarTrigger
        className="-ml-1 text-gray-700 hover:text-primary"
        aria-label={t.header.openMenu}
      />
      <Separator orientation="vertical" className="mr-1 h-4 md:hidden" />

      {/* Brand shown only on mobile, where the sidebar is hidden */}
      <Link
        to="/home"
        className="flex items-center gap-1.5 text-primary font-bold tracking-tight md:hidden"
      >
        <BookOpen className="h-5 w-5 stroke-[2.5]" />
        <span>{t.common.appName}</span>
      </Link>

      <div className="ml-auto">
        <button
          onClick={nextLang}
          className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-secondary border border-border rounded hover:bg-muted text-gray-700 transition-colors"
          title={t.header.toggleLanguage}
        >
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span>{lang}</span>
        </button>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  const { signOut, sessionHoursRemaining } = useAuth();
  const { t, format } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="mt-auto border-t border-border py-6 text-center text-sm text-gray-500 bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>{t.footer.copyright}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
            {format(t.footer.expiresIn, { hours: sessionHoursRemaining })}
          </span>
          <button
            onClick={() => {
              signOut();
              navigate("/expired");
            }}
            className="text-xs text-red-600 hover:underline bg-red-50 px-2 py-1 rounded border border-red-200 transition-colors"
          >
            {t.footer.expireDemo}
          </button>
        </div>
      </div>
    </footer>
  );
};
