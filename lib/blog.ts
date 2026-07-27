import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  keywords: string[];
  image?: string;
  faqs?: { question: string; answer: string }[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readTime: string;
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const fullPath = path.join(POSTS_PATH, `${slug}.${locale}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/g).length;
  const readTimeMinutes = Math.ceil(wordCount / 200);

  return {
    frontmatter: data as PostFrontmatter,
    content,
    readTime: `${readTimeMinutes} min read`,
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
