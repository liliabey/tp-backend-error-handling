import { getTranslation } from "../i18n/index.js";

export const localeMiddleware = (req, res, next) => {
  const customHeader = req.headers["x-language"];
  const acceptLanguage = req.headers["accept-language"];

  let locale = "en";

  if (customHeader) {
    locale = customHeader.toLowerCase().substring(0, 2);
  } else if (acceptLanguage) {
    locale = acceptLanguage.toLowerCase().substring(0, 2);
  }

  const supportedLocales = ["en", "fr", "ar"];
  req.locale = supportedLocales.includes(locale) ? locale : "en";

  req.t = (key, variables) => getTranslation(req.locale, key, variables);

  next();
};
