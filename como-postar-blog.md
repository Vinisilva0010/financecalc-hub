1. Estrutura de Arquivo e Nomenclatura
Caminho: content/blog/[slug].[locale].mdx

Nomenclatura do arquivo: Use hífens, minúsculas e inclua a extensão de idioma.

Exemplo: snowball-vs-avalanche.en.mdx e snowball-vs-avalanche.pt.mdx

2. Cabeçalho Obrigatório (Frontmatter)
Todo arquivo deve começar exatamente com este bloco YAML no topo:

YAML
---
title: "Título Focado na Palavra-Chave Principal (Max 60 caracteres)"
description: "Resumo persuasivo com a palavra-chave. Explique o que o leitor vai aprender. (Max 155 caracteres)"
date: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
locale: "en" # ou "pt"
slug: "nome-do-slug-igual-ao-arquivo"
category: "Loans" # Categorias: Real Estate, Debt Strategy, Investing, Savings, Analytics, Loans
relatedTool: "/tools/mortgage-calculator" # Rota exata da calculadora do cluster
keywords:
  - "palavra chave principal 2026"
  - "palavra chave secundaria long tail"
  - "como calcular X"
faqs:
  - question: "Pergunta frequente exata que as pessoas buscam no Google?"
    answer: "Resposta direta e objetiva de 2 a 3 frases."
  - question: "Outra pergunta relevante?"
    answer: "Resposta direta com dados ou fatos."
---
3. Diretrizes de Conteúdo (SEO & E-E-A-T)
A. Título e Palavras-Chave (Long-Tail)
Sempre inclua o ano atual (2026) em títulos de guias práticos para indicar conteúdo atualizado.

Foque em intenção de busca clara: "How to Calculate", "VS", "Is it worth it", "Guide".

B. Estrutura Visual do MDX
Primeiro parágrafo (Hook): Responda à dúvida principal do leitor nos primeiros 2 parágrafos. Não enrole.

Uso de H2 (##) e H3 (###): Divida o artigo em seções lógicas. Use a palavra-chave secundária nos H2s.

Destaques (> Quote): Use citações blocadas para Dicas Rápidas, Avisos de Risco ou Fórmulas.

Listas (* ou 1.): Evite blocos longos de texto. Use listas para facilitar a leitura rápida (scannability).

C. Linkagem Interna Obrigatória (Cluster Strategy)
Link no corpo do texto: Todo artigo deve ter pelo menos 1 a 2 links contextuais no meio do texto apontando para a calculadora relevante do site.

Exemplo: Acesse nossa [Calculadora de Financiamento](/tools/mortgage-calculator) para simular.

Campo relatedTool: Preencha sempre o relatedTool no frontmatter para que o card de conversão seja renderizado automaticamente no final do post.

D. Bloco de FAQ no Frontmatter (Rich Snippets)
Escreva de 2 a 4 perguntas e respostas no array faqs do frontmatter.

O sistema converte esse bloco automaticamente no Schema JSON-LD de FAQPage, fazendo o Google exibir suas perguntas direto na página de busca.

4. Checklist Rápido Antes de Salvar o Post
O slug no frontmatter é idêntico ao nome do arquivo?

O relatedTool aponta para uma rota de calculadora válida (ex: /tools/credit-card-payoff)?

A data updatedAt está atualizada?

O campo locale está correto (en ou pt)?

Há pelo menos 1 link interno para a calculadora dentro do texto MDX?