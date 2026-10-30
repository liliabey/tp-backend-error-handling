import en from "./locales/en.json" assert { type: "json" };
import fr from "./locales/fr.json" assert { type: "json" };
import ar from "./locales/ar.json" assert { type: "json" };

const translations = { en, fr, ar };

export function getTranslation(locale, key, variables = {}) {
  const lang = translations[locale] ? locale : "en";
  const keys = key.split(".");
  let value = keys.reduce((obj, k) => obj?.[k], translations[lang]);

  if (!value && lang !== "en") {
    value = keys.reduce((obj, k) => obj?.[k], translations["en"]);
  }

  if (typeof value === "string") {
    return value.replace(
      /\{\{(.+?)\}\}/g,
      (_, match) => variables[match.trim()] || "",
    );
  }

  return value || key;
}
