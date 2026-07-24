import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/lib/i18n/routing";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Calendar, Clock, ArrowLeft, Calculator } from "lucide-react";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.frontmatter.title} | FinanceCalc Hub`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readTime } = post;

  // Schema JSON-LD para Google (Article + FAQPage)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt,
    author: {
      "@type": "Organization",
      name: "FinanceCalc Hub",
    },
  };

  const faqSchema = frontmatter.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: frontmatter.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div>
        {/* HEADER DO POST */}
        <section className="border-b-[6px] border-black bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-[3px] border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase mb-6 shadow-[3px_3px_0_#000]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>

            <div className="flex items-center gap-4 text-xs font-black uppercase mb-4">
              <span className="border-[2px] border-black bg-black text-white px-2 py-0.5">
                {frontmatter.category}
              </span>
              <span className="flex items-center gap-1 text-black/70">
                <Calendar className="w-3.5 h-3.5" />
                Updated: {frontmatter.updatedAt}
              </span>
              <span className="flex items-center gap-1 text-black/70">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase leading-tight tracking-tight text-black mb-6">
              {frontmatter.title}
            </h1>

            <p className="text-lg font-bold text-black/80 leading-relaxed border-l-[6px] border-yellow-300 pl-4 py-1 bg-neutral-50">
              {frontmatter.description}
            </p>
          </div>
        </section>

        {/* CONTEÚDO DO POST */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <article className="prose prose-lg max-w-none font-sans font-medium text-black prose-headings:font-black prose-headings:uppercase prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b-[4px] prose-h2:border-black prose-h2:pb-2 prose-h2:mt-10 prose-a:font-black prose-a:text-black prose-a:underline prose-blockquote:border-l-[6px] prose-blockquote:border-black prose-blockquote:bg-yellow-300 prose-blockquote:p-4 prose-blockquote:font-bold">
            <MDXRemote source={content} />
          </article>

          {/* CTA INTERNO PARA A CALCULADORA DO CLUSTER */}
          {frontmatter.relatedTool && (
            <div className="mt-12 border-[6px] border-black bg-yellow-300 p-8 shadow-[8px_8px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black uppercase text-black mb-2">
                  Ready to calculate your numbers?
                </h3>
                <p className="font-bold text-sm text-black/80">
                  Use our bank-grade interactive calculator with instant results and complete privacy.
                </p>
              </div>
              <Link
                href={frontmatter.relatedTool}
                className="inline-flex items-center gap-2 border-[4px] border-black bg-black text-white px-8 py-4 text-sm font-black uppercase tracking-wider shrink-0 hover:bg-white hover:text-black transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Open Calculator</span>
              </Link>
            </div>
          )}

          {/* SEÇÃO DE FAQ RENDERIZADA */}
          {frontmatter.faqs && frontmatter.faqs.length > 0 && (
            <div className="mt-16 border-[6px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
              <h2 className="text-3xl font-black uppercase mb-6 border-b-[4px] border-black pb-2">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {frontmatter.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b-[2px] border-neutral-200 pb-4">
                    <h3 className="text-lg font-black uppercase mb-2 text-black">
                      {faq.question}
                    </h3>
                    <p className="font-bold text-sm text-black/75 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
