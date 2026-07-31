import { getAllPosts } from "@/lib/blog";
import { Link } from "@/lib/i18n/routing";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Guides & Articles | FinanceCalc Hub",
  description: "In-depth financial guides, calculation strategies, and debt payoff methods built for high-precision decision making.",
};

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogListPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <main className="flex min-h-screen flex-1 flex-col justify-between bg-white">
      <div>
        {/* HEADER */}
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-4 inline-block border-[4px] border-black bg-white px-3 py-1 font-mono text-xs font-black uppercase">
              SEO Content Hub
            </div>
            <h1 className="mb-4 text-4xl font-black uppercase tracking-[-1.5px] text-black md:text-6xl">
              Financial Guides & Insights
            </h1>
            <p className="max-w-2xl text-lg font-bold text-black/80">
              Master your personal finances, compare calculation formulas, and make data-backed choices.
            </p>
          </div>
        </section>

        {/* POSTS GRID */}
        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          {posts.length === 0 ? (
            <div className="border-[5px] border-black bg-white p-8 text-center font-bold">
              No articles published for this region yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col justify-between border-[6px] border-black bg-white shadow-[8px_8px_0_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000]"
                >
                  {/* Imagem do post */}
                  {post.image && (
                    <Link
                      href={`/blog/${post.slug}`}
                      locale={locale}
                      className="block overflow-hidden border-b-[5px] border-black"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  )}

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="border-[3px] border-black bg-yellow-300 px-2 py-0.5 font-mono text-xs font-black uppercase">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-black/70">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.updatedAt}</span>
                        </div>
                      </div>

                      <h2 className="mb-3 text-2xl font-black uppercase tracking-tight text-black hover:underline">
                        <Link href={`/blog/${post.slug}`} locale={locale}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="mb-6 text-sm font-bold leading-relaxed text-black/75">
                        {post.description}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      locale={locale}
                      className="inline-flex items-center gap-2 self-start border-[4px] border-black bg-black px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-yellow-300 hover:text-black"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}