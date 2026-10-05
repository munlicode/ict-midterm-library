import type { en } from "./locales/en";

export type Translations = typeof en;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};

/** Non-English locales may omit keys; they fall back to English. */
export type PartialTranslations = DeepPartial<Translations>;
