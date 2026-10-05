import { useAuth } from "../context/AuthContext";
import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { kk } from "./locales/kk";
import type { PartialTranslations, Translations } from "./types";

/**
 * ─── Language registry ───────────────────────────────────────────────
 * To add a language:
 *   1. Create `locales/<code>.ts` exporting a `PartialTranslations` object.
 *   2. Add one entry below.
 */
export const LANGUAGES = [
  { code: "EN", nativeName: "English", dict: en as PartialTranslations },
  { code: "RU", nativeName: "Русский", dict: ru },
  { code: "KK", nativeName: "Қазақша", dict: kk },
] as const;

export type Language = (typeof LANGUAGES)[number]["code"];
export const DEFAULT_LANGUAGE: Language = "EN";

export type { Translations };

// ─── Fallback merge (missing keys → English) ────────────────────────
function deepMerge<T>(base: T, override: unknown): T {
  if (!override || typeof override !== "object") return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override)) {
    const baseVal = out[key];
    out[key] =
      baseVal && typeof baseVal === "object"
        ? deepMerge(baseVal, value)
        : (value ?? baseVal);
  }
  return out as T;
}

const resolved = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, deepMerge(en, l.dict)]),
) as Record<Language, Translations>;

export const getTranslations = (lang: Language): Translations =>
  resolved[lang] ?? en;

/** Replace `{name}` placeholders: format("Hi, {name}", { name: "Dan" }) */
export const format = (
  template: string,
  params: Record<string, string | number>,
): string =>
  template.replace(/\{(\w+)\}/g, (_, k) =>
    k in params ? String(params[k]) : `{${k}}`,
  );

/** Main hook for components. */
export const useTranslation = () => {
  const { lang, setLang } = useAuth();

  const nextLang = () => {
    const i = LANGUAGES.findIndex((l) => l.code === lang);
    setLang(LANGUAGES[(i + 1) % LANGUAGES.length].code);
  };

  return { t: getTranslations(lang), lang, setLang, nextLang, format };
};
