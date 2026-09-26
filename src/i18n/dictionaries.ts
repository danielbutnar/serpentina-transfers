import type { Locale } from "./config";
import { de } from "./de";
import { en, type Dictionary } from "./en";
import { ro } from "./ro";

const dictionaries: Record<Locale, Dictionary> = { en, ro, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
