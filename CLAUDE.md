INSTRUÇÃO OBRIGATÓRIA — POSTS DO FINANCECALC HUB
Você vai criar posts de blog para o site FinanceCalc Hub (calculadoras financeiras).
Sempre gere dois arquivos: um em inglês e um em português, com o mesmo conteúdo equivalente (não tradução preguiçosa).
1. Frontmatter obrigatório (igual nos dois)
YAML---
title: "Título claro e específico"
description: "Description de 140–160 caracteres, objetiva"
date: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
locale: "en"   # ou "pt"
slug: "slug-em-kebab-case-minusculo-em-ingles"
category: "Categoria curta"
relatedTool: "/tools/nome-exato-da-tool"
author: "Vinicius Pontual"
image: "/images/blog/slug-em-kebab-case.jpg"
keywords:
  - "keyword 1"
  - "keyword 2"
  - "keyword 3"
faqs:
  - question: "Pergunta útil 1?"
    answer: "Resposta clara e direta."
  - question: "Pergunta útil 2?"
    answer: "Resposta clara e direta."
  - question: "Pergunta útil 3?"
    answer: "Resposta clara e direta."
---
Regras do slug:

Sempre em inglês
Sempre kebab-case minúsculo
Nunca PascalCase, nunca post-um, nunca slug de outro tema
Exemplo certo: how-to-estimate-what-you-can-afford-in-2026
Exemplo errado: Tool-to-Reach-Financial-Independence / How-to-Estimate... / post-cinco

2. Estrutura obrigatória do corpo (nessa ordem)

Introdução
Problema real do leitor + o que ele vai aprender no post.
Conceito
Explicar o que é o tema na prática (capacidade de pagamento, juros compostos, etc.).
Lógica / fórmula
Mostrar a lógica ou fórmula de forma clara. Usar tabela se ajudar.
Exemplo numérico 1
Números concretos, contas feitas, interpretação do resultado.
Exemplo numérico 2 (ou variação de cenário)
Outro caso prático.
Como mudanças nos inputs alteram o resultado
Renda, prazo, taxa, entrada, dívidas etc.
Erros comuns
3 erros que as pessoas cometem nesse tema.
Como usar a calculadora do FinanceCalc Hub
Explicar o uso da tool e linkar com o path correto, ex: /tools/affordability
Disclaimer obrigatório no final (texto fixo, adaptar idioma):

PT:
Este conteúdo é apenas educacional e informativo. As estimativas das calculadoras não constituem aconselhamento financeiro, de investimento, jurídico ou de crédito, nem garantia de aprovação. Sempre consulte um profissional qualificado antes de tomar decisões financeiras.
EN:
This content is for educational and informational purposes only. Calculator estimates do not constitute financial, investment, legal, or credit advice, nor any guarantee of approval. Always consult a qualified professional before making financial decisions.
3. O que o post TEM que ter

Entre 900 e 1500 palavras (sem enrolação)
Pelo menos 1–2 exemplos com números reais
Link claro para a tool relacionada
FAQs úteis (mínimo 3)
Tom técnico, direto, educacional
Autor: Vinicius Pontual
Conteúdo original (não genérico de IA genérica)
EN e PT com a mesma qualidade e profundidade

4. O que o post NÃO pode ter

Slug errado ou em PascalCase
Imagem com nome post-um, post-cinco, etc.
Citações falsas tipo [web:12] ou fontes inventadas
Promessas de aprovação de crédito, retorno garantido, “fique rico”
Texto genérico sem números
Falta de disclaimer
Falta de link para a calculadora
Conteúdo diferente de verdade entre EN e PT (um bom e outro ruim)
Keyword stuffing
Tom de vendedor / hype
Aconselhamento financeiro disfarçado de certeza

5. Qualidade exigida

YMYL (finanças): conteúdo responsável
Explicar limitações das estimativas
Não tratar resultado da calculadora como verdade absoluta
Preferir clareza técnica a floreio

6. Formato de entrega
Entregar sempre assim:
Arquivo EN:
slug.en.mdx
(com frontmatter locale: "en")
Arquivo PT:
slug.pt.mdx
(com frontmatter locale: "pt")
Os dois com o mesmo slug.


No MDX, o símbolo $ é reservado ou parseado como expressão. Quando solto como R$ 3.000 ou misturado com formatação de tabela, o compilador do next-mdx-remote (via acorn) tenta interpretar aquilo como sintaxe de código ou MathJax malformado e estoura o build.

A solução definitiva para os próximos artigos em PT é usar a entidade HTML R&#36; ou formatar o texto evitando cifrões soltos fora de blocos matemáticos explícitos.


Zero caixas de código internas (```text ou ```plaintext) no meio do artigo.

Zero sintaxe LaTeX de chaves ({}) que o Acorn possa tentar parsear como JSX.

Fórmulas sempre em texto corrido e em negrito (**VF = VP * (1 + r)^n**).

Moeda em PT sempre usando R&#36;.

Formato único e limpo, pronto para rodar direto via cat << 'EOF' no terminal.