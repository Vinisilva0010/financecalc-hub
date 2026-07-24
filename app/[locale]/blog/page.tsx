import { getAllPosts } from "@/lib/blog";
import { Link } from "@/lib/i18n/routing";
import Footer from "@/components/Footer";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
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
    <main className="flex-1 bg-white flex flex-col justify-between min-h-screen">
      <div>
        {/* HEADER */}
        <section className="border-b-[6px] border-black bg-yellow-300 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-4 inline-block border-[4px] border-black bg-white px-3 py-1 font-mono text-xs font-black uppercase">
              SEO Content Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[-1.5px] text-black mb-4">
              Financial Guides & Insights
            </h1>
            <p className="text-lg font-bold text-black/80 max-w-2xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="border-[6px] border-black bg-white p-6 shadow-[8px_8px_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="border-[3px] border-black bg-yellow-300 px-2 py-0.5 font-mono text-xs font-black uppercase">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-black/70">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.updatedAt}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-black uppercase tracking-tight mb-3 text-black hover:underline">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="font-bold text-sm text-black/75 mb-6 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 border-[4px] border-black bg-black text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider self-start hover:bg-yellow-300 hover:text-black transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
