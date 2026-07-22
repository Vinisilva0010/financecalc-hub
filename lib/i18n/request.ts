import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  
  // Extrai locale do pathname (ex: /pt/tools -> pt)
  const pathLocale = pathname.split("/")[1];
  const safeLocale =
    pathLocale && routing.locales.includes(pathLocale as "en" | "pt")
      ? pathLocale
      : routing.defaultLocale;

  const messages = (await import(`../../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages,
    timeZone: "UTC",
    now: new Date(),
  };
});