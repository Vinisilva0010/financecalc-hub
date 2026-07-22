DOCUMENTO COMPLETO: FinanceCalc HubSite Bilíngue (EN + PT) de Calculadoras Financeiras
Foco: Alto RPM com Google AdSense + Tráfego Orgânico Sustentável
Data: Julho 2026FASE 0: Definições e Estratégia Geral (Leia antes de qualquer coisa)Nome do projeto: FinanceCalc Hub (ou o nome que você escolher)
Idiomas: Inglês (principal para RPM alto) + Português (para Brasil e mercados lusófonos)
Estratégia de idioma: next-intl com roteamento por subpasta (/en/ e /pt/) ou detecção automática + seletor claro no site.
Modelo de negócio principal: Google AdSense (foco em RPM alto)
Público-alvo principal: Tráfego Tier-1 (EUA, UK, CA, AU) para maximizar RPM
Estratégia de SEO para ranquear alto:E-E-A-T forte (obrigatório em YMYL)
Calculadoras + ecossistema de conteúdo (blog com clusters)
Schema markup avançado
Ferramentas úteis que atraem backlinks naturais
Atualizações frequentes
Velocidade e experiência do usuário impecáveis

Metas realistas:0-6 meses: Construção + tráfego inicial
6-12 meses: Primeiros resultados de monetização
12-24 meses: Escala significativa (se executado bem)

FASE 1: Setup do Projeto + Configuração BilíngueObjetivo: Criar a base técnica sólida com suporte a dois idiomas.Passos exatos:Criar o projeto:bash

npx create-next-app@latest financecalc-hub --yes
cd financecalc-hub

Instalar dependências principais:bash

npm install next-intl lucide-react recharts react-hook-form zod @hookform/resolvers decimal.js
npx shadcn@latest init

Configurar next-intl (melhor prática 2026 para App Router):Criar pasta i18n/
Arquivos: routing.ts, request.ts
Pastas de mensagens: messages/en.json e messages/pt.json
Middleware para roteamento (/en/ e /pt/)
Seletor de idioma visível no header (com bandeira + nome)

Estrutura de pastas recomendada (crie exatamente assim):

app/
├── [locale]/                  # Pasta dinâmica para idiomas
│   ├── layout.tsx
│   ├── page.tsx               # Homepage
│   ├── tools/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── about/
├── components/
├── lib/
│   ├── calculators/           # Lógica das calculadoras
│   └── i18n/
├── messages/
│   ├── en.json
│   └── pt.json
├── types/
public/

O que não pode faltar:Todas as strings de UI em messages/en.json e messages/pt.json
Tradução de títulos, descrições, labels de inputs e explicações das calculadoras
URLs amigáveis por idioma (ex: /en/mortgage-calculator e /pt/calculadora-hipoteca)

FASE 2: Sistema de Design + Componentes ReutilizáveisCrie um sistema consistente:Instale e configure shadcn/ui completamente
Crie componentes reutilizáveis:CalculatorLayout.tsx (template padrão de todas as calculadoras)
NumberInput, CurrencyInput, PercentInput, SliderInput
ResultCard, AmortizationTable, ChartWrapper (Recharts)
Disclaimer (componente forte e reutilizável)
RelatedTools
LanguageSwitcher

Regra: Toda calculadora deve seguir o mesmo layout para consistência e SEO.FASE 3: Implementação das Calculadoras (Coração do Site)Primeiras 8 calculadoras (faça nessa ordem):Mortgage Calculator (a mais importante)
Personal Loan / EMI Calculator
Credit Card Payoff Calculator (Snowball vs Avalanche)
Compound Interest Calculator
Savings Goal Calculator
Debt Payoff Calculator
Investment Return / CAGR Calculator
Affordability Calculator

Para cada calculadora, o que deve ser implementado:Inputs com validação (React Hook Form + Zod)
Cálculos precisos usando decimal.js
Resultados em tempo real
Gráfico de evolução (Recharts)
Tabela de amortização (quando aplicável)
Explicação detalhada passo a passo
Fatores que afetam o resultado
Exemplos práticos
Schema markup (WebApplication + HowTo + FAQPage)
Disclaimer forte
Botão de compartilhar resultado (URL com parâmetros)
Related Tools

Dica de SEO para ranquear alto:
Cada página de calculadora deve ter bastante conteúdo textual de qualidade ao redor da ferramenta (não só a calculadora).FASE 4: Homepage + NavegaçãoHomepage deve ser forte em conversão e SEO:Navbar com seletor de idioma claro
Hero com headline poderosa + CTA
Grid de calculadoras em destaque
Seção de benefícios + confiança (E-E-A-T)
Seção de depoimentos/estatísticas
Footer completo

FASE 5: Blog + Estratégia de Conteúdo para Ranquear AltoCrie um blog robusto (use MDX ou Contentlayer).Estratégia para tentar ficar bem posicionado no Google:Crie clusters de conteúdo (1 pillar + vários artigos de suporte por calculadora)
Exemplos de artigos:“Mortgage Calculator 2026: How to Calculate Your Monthly Payment Accurately”
“Snowball vs Avalanche Debt Payoff: Which Method is Better?”
“How Much House Can I Afford in 2026? (Free Calculator + Complete Guide)”

O que fazer para maximizar ranking:Use palavras-chave long-tail específicas
Escreva explicações profundas
Coloque links internos fortes para as calculadoras
Adicione datas de atualização
Use schema FAQ e HowTo

FASE 6: Páginas de E-E-A-T e Legais (Obrigatório para YMYL)Crie:/about (com bios, experiência e credibilidade)
/disclaimer (texto forte)
/privacy-policy
/terms-of-service

Checklist de E-E-A-T que deve estar em todo o site:Autores nomeados com bio
Fontes citadas
Datas de atualização
Disclaimers claros em todas as calculadoras
Transparência sobre monetização (AdSense)

FASE 7: SEO Técnico Avançado + Otimizações para Ranquear AltoImplemente o seguinte:Metadata dinâmica por página e por idioma
JSON-LD Schema completo (WebApplication, HowTo, FAQPage, FinancialProduct)
Core Web Vitals otimizados (prioridade máxima)
Sitemap e robots.txt
Internal linking estratégico (blog → calculadoras)
Velocidade extrema nas calculadoras
Mobile-first perfeito
Atualizações regulares de conteúdo

Meta: Fazer o site o mais “confiável e útil” possível para o Google dar prioridade.FASE 8: Preparação para Monetização (AdSense)Deixe espaços marcados para anúncios com comentários claros
Posicionamentos recomendados:Logo após os resultados principais da calculadora
No meio das explicações
Anchor ads no mobile

Nunca polua a experiência do usuário (isso mata RPM a longo prazo)

FASE 9: Deploy, Analytics e LançamentoDeploy no Vercel
Configure domínio
Google Analytics 4 + Vercel Analytics
Google Search Console (envie sitemap dos dois idiomas)
Aplique para AdSense quando o site tiver qualidade e volume de páginas

FASE 10: Crescimento Pós-LançamentoAdicione mais calculadoras
Publique novos artigos no blog regularmente
Monitore rankings e RPM
Otimize páginas com baixo desempenho
Considere criar mais sites semelhantes depois

Resumo Final – O que você e a Kimi devem seguir religiosamente:Bilíngue desde o dia 1 (next-intl)
E-E-A-T forte em tudo (essencial para finanças)
Calculadoras + conteúdo de qualidade ao redor
Schema markup + SEO técnico impecável
Velocidade e experiência do usuário excelentes
Disclaimers e transparência

