import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale =
    locale && routing.locales.includes(locale as "en" | "pt")
      ? locale
      : routing.defaultLocale;

  const messages = (await import(`../../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages,
    timeZone: "UTC",
    now: new Date(),
  };
});