import type { LucideIcon } from "lucide-react";
import { Home, Info, Search } from "lucide-react";
import type { Translations } from "../i18n";

/**
 * ─── Sidebar navigation registry ─────────────────────────────────────
 * To add a page (e.g. Library Info):
 *   1. Create the page component in `src/pages/`.
 *   2. Add its <Route> inside the AppLayout route in `App.tsx`.
 *   3. Add a label under `nav` in `i18n/locales/en.ts`.
 *   4. Add an entry below — it appears in the sidebar automatically.
 */
export interface NavItem {
  to: string;
  labelKey: keyof Translations["nav"];
  icon: LucideIcon;
  /** Extra path prefixes that should highlight this item (e.g. /book/:id → Search). */
  activePrefixes?: string[];
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/home", labelKey: "home", icon: Home },
  {
    to: "/search",
    labelKey: "search",
    icon: Search,
    activePrefixes: ["/book"],
  },
  {
    to: "/about",
    labelKey: "about",
    icon: Info,
    activePrefixes: ["/about"],
  },
];

export const isNavItemActive = (item: NavItem, pathname: string) =>
  [item.to, ...(item.activePrefixes ?? [])].some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
