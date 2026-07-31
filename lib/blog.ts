import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DEFAULT_AUTHOR } from "@/lib/author";

const POSTS_PATH = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  locale: string;
  slug: string;
  category: string;
  relatedTool: string;
  authorName?: string;
  authorRole?: string;
  keywords: string[];
  image?: string;
  faqs?: { question: string; answer: string }[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  author: typeof DEFAULT_AUTHOR;
  readTime: string;
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  if (!fs.existsSync(POSTS_PATH)) {
    return null;
  }

  // Tenta pelo caminho direto tradicional
  const directPath = path.join(POSTS_PATH, `${slug}.${locale}.mdx`);
  let fullPath = directPath;

  if (!fs.existsSync(directPath)) {
    // Se não achar direto pelo nome do arquivo, varre a pasta procurando o slug no frontmatter
    const files = fs.readdirSync(POSTS_PATH).filter((f) => f.endsWith(`.${locale}.mdx`) || f.endsWith(".mdx"));
    const matchedFile = files.find((file) => {
      const filePath = path.join(POSTS_PATH, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      return data.slug === slug && (data.locale ? data.locale === locale : true);
    });

    if (!matchedFile) {
      return null;
    }
    fullPath = path.join(POSTS_PATH, matchedFile);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/g).length;
  const readTimeMinutes = Math.ceil(wordCount / 200);

  return {
    frontmatter: data as PostFrontmatter,
    content,
    readTime: `${readTimeMinutes} min read`,
    author: {
      ...DEFAULT_AUTHOR,
      name: data.authorName ?? DEFAULT_AUTHOR.name,
      role: data.authorRole ?? DEFAULT_AUTHOR.role,
    },
  };
}

export function getAllPosts(locale?: string): PostFrontmatter[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_PATH);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fullPath = path.join(POSTS_PATH, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return data as PostFrontmatter;
    })
    .filter((post) => (locale ? post.locale === locale : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}