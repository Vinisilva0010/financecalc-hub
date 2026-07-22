import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/lib/i18n/routing";
import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";
import { Link } from "@/lib/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FinanceCalc Hub",
  description: "Free financial calculators for smarter money decisions",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt")) {
    notFound();
  }

  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, "utf-8"));

  return (
    <html lang={locale} className={`${inter.variable} font-sans`}>
      <body className="min-h-full flex flex-col bg-white text-black font-bold">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Header / Navbar */}
          <header className="sticky top-0 z-50 border-b-[5px] border-black bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <Link
                href="/"
                className="text-xl font-black uppercase tracking-tight text-black md:text-2xl"
              >
                FinanceCalc<span className="text-yellow-500">Hub</span>
              </Link>

              <div className="flex items-center gap-3">
                <nav className="hidden items-center gap-2 md:flex">
                  {[
                    { href: "/", label: "nav.home" },
                    { href: "/tools", label: "nav.tools" },
                    { href: "/blog", label: "nav.blog" },
                    { href: "/about", label: "nav.about" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="border-[3px] border-transparent px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:border-black hover:bg-yellow-300 hover:shadow-[3px_3px_0_#000]"
                    >
                      {messages.nav[item.label.split(".")[1]] || item.label}
                    </Link>
                  ))}
                </nav>
                <LanguageSwitcher />
              </div>
            </div>
          </header>

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
