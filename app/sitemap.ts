import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://financecalchub.com";
const LOCALES = ["en", "pt"];

const TOOLS = [
  "mortgage-calculator",
  "personal-loan-calculator",
  "credit-card-payoff",
  "compound-interest",
  "savings-goal",
  "debt-payoff",
  "investment-return",
  "affordability",
];

const LEGAL_PAGES = ["about", "disclaimer", "privacy-policy", "terms-of-service", "blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home e Páginas Institucionais
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    });

    LEGAL_PAGES.forEach((page) => {
      routes.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "blog" ? 0.9 : 0.5,
      });
    });

    // Ferramentas / Calculadoras
    TOOLS.forEach((tool) => {
      routes.push({
        url: `${BASE_URL}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  });

  // Posts do Blog
  const postsEn = getAllPosts("en");
  const postsPt = getAllPosts("pt");

  postsEn.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  postsPt.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/pt/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}
