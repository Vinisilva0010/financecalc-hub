import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://financecalchub.zanvexis.com";
const LOCALES = ["en", "pt"];

const TOOLS = [
  "affordability",
  "debt-payoff",
  "investment-return",
  "personal-loan-calculator",
  "compound-interest",
  "credit-card-payoff",
  "savings-goal",
  "mortgage-calculator",
];

const LEGAL_PAGES = [
  "about",
  "disclaimer",
  "privacy",
  "terms",
  "contact",
  "blog",
  "tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

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
        priority: page === "blog" || page === "tools" ? 0.9 : 0.5,
      });
    });

    TOOLS.forEach((tool) => {
      routes.push({
        url: `${BASE_URL}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  });

  const postsEn = getAllPosts("en");
  const postsPt = getAllPosts("pt");

  postsEn.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  postsPt.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/pt/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}
