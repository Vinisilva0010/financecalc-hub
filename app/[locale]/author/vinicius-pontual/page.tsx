import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ShieldCheck, Code, Award, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://financecalchub.zanvexis.com";
  const title = locale === "pt" ? "Vinicius Pontual - Autor e Engenheiro Principal | FinanceCalc Hub" : "Vinicius Pontual - Author & Lead Engineer | FinanceCalc Hub";
  const description = locale === "pt" 
    ? "Conheça Vinicius Pontual, engenheiro de software especialista em algoritmos financeiros de alta precisão e criador do FinanceCalc Hub."
    : "Meet Vinicius Pontual, software engineer specializing in high-precision financial algorithms and creator of FinanceCalc Hub.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/author/vinicius-pontual`,
      languages: { en: `${baseUrl}/en/author/vinicius-pontual`, pt: `${baseUrl}/pt/author/vinicius-pontual` },
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { locale } = await params;
  const isPt = locale === "pt";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vinicius Pontual",
    "jobTitle": "Lead Software Engineer & Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Zanvexis"
    },
    "url": `https://financecalchub.zanvexis.com/${locale}/author/vinicius-pontual`,
    "sameAs": [
      "https://github.com/vinnipontual",
      "https://linkedin.com/in/viniciuspontual",
      "https://zanvexis.com"
    ]
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="border-[4px] border-black bg-white p-8 shadow-[8px_8px_0_#000]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="h-32 w-32 flex-shrink-0 rounded-full border-[4px] border-black bg-yellow-300 flex items-center justify-center font-black text-3xl shadow-[4px_4px_0_#000]">
            VP
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-black">Vinicius Pontual</h1>
              <p className="text-sm font-bold uppercase tracking-wider text-neutral-600">
                {isPt ? "Engenheiro de Software & Criador do FinanceCalc Hub" : "Software Engineer & Creator of FinanceCalc Hub"}
              </p>
            </div>

            <p className="text-base font-medium leading-relaxed text-black">
              {isPt
                ? "Engenheiro de software e fundador da Zanvexis, focado em desenvolvimento de sistemas de alta performance, matemática computacional e arquitetura de software. Desenvolveu o FinanceCalc Hub com o objetivo de entregar calculadoras financeiras de precisão arbitrária sem dependência de processamento em servidor, garantindo privacidade total e zero retenção de dados dos usuários."
                : "Software engineer and founder of Zanvexis, focusing on high-performance systems engineering, computational mathematics, and software architecture. Built FinanceCalc Hub to deliver arbitrary-precision financial calculators running 100% client-side, ensuring complete privacy and zero data retention."}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a
                href="https://github.com/vinnipontual"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[2px] border-black bg-neutral-100 px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#000] hover:bg-yellow-300"
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://linkedin.com/in/viniciuspontual"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[2px] border-black bg-neutral-100 px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#000] hover:bg-yellow-300"
              >
                LinkedIn <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://zanvexis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[2px] border-black bg-neutral-100 px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#000] hover:bg-yellow-300"
              >
                Zanvexis <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-[2px] border-black" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-[2px] border-black p-4 bg-neutral-50">
            <ShieldCheck className="h-6 w-6 text-black mb-2" />
            <h3 className="font-black uppercase text-sm mb-1">{isPt ? "Rigor Matemático" : "Mathematical Rigor"}</h3>
            <p className="text-xs font-medium text-neutral-700">
              {isPt ? "Uso de bibliotecas de precisão decimal para eliminar erros de arredondamento em amortizações longas." : "Decimal precision libraries used to remove rounding errors in long amortization schedules."}
            </p>
          </div>

          <div className="border-[2px] border-black p-4 bg-neutral-50">
            <Code className="h-6 w-6 text-black mb-2" />
            <h3 className="font-black uppercase text-sm mb-1">{isPt ? "Arquitetura Client-Side" : "Client-Side Architecture"}</h3>
            <p className="text-xs font-medium text-neutral-700">
              {isPt ? "100% dos cálculos são executados no seu navegador. Nenhum dado financeiro trafega para servidores." : "100% of calculations execute in your browser. No financial data ever hits a server."}
            </p>
          </div>

          <div className="border-[2px] border-black p-4 bg-neutral-50">
            <Award className="h-6 w-6 text-black mb-2" />
            <h3 className="font-black uppercase text-sm mb-1">{isPt ? "Validação YMYL" : "YMYL Validation"}</h3>
            <p className="text-xs font-medium text-neutral-700">
              {isPt ? "Fórmulas alinhadas com padrões bancários internacionais e tabelas padrão SAC e Price." : "Formulas aligned with international banking standards and standard SAC/Price tables."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
