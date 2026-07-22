"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

const locales = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 border-[3px] border-black bg-white shadow-[3px_3px_0_#000]">
      <div className="border-r-[3px] border-black px-2 py-1.5">
        <Globe className="h-4 w-4" />
      </div>
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all ${
            locale === loc.code
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-yellow-300"
          }`}
        >
          {loc.flag} {loc.label}
        </button>
      ))}
    </div>
  );
}