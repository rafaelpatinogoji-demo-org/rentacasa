---
description: Módulo de estatísticas para o app
auto_execution_mode: 1
---

Tarefa
Adicione um botão "Estatísticas" na navbar da Home, localizado no canto superior direito, que ao ser clicado navegue para /statistics. Crie a página de Estatísticas como um dashboard minimalista, muito bem projetado, com cores verdes, que use Chart.js para renderizar gráficos que consumam os 6 endpoints do módulo de estatísticas criado anteriormente. Deve aproveitar todos os filtros disponíveis na API e ser abrangente, útil e responsivo.

VERIFIQUE A API PARA PODER CONSTRUIR A INTERFACE E O CÓDIGO REACT PARA QUE TUDO CORRESPONDA PERFEITAMENTE, VERIFIQUE AS ROTAS, SEUS PARÂMETROS E RESPOSTAS


Requisitos de Navegação
	•	Na navbar (seção superior, alinhamento à direita) adicione um botão/item "Estatísticas".
	•	Ao ser clicado → navegue para a rota /statistics (SPA).
	•	Mantenha estilo visual consistente com a marca existente (tipografia, espaçamento, glass/sombras suaves se aplicável).

Design e Aparência (UI/UX)
	•	Estilo minimalista, premium, limpo: muito espaço, hierarquia clara, tipografia legível.
	•	Paleta: base branca e cinza suave; acentos verdes (variar intensidades para estados/séries).
	•	Acessibilidade: contraste AA, tamanhos legíveis, estados focus/hover visíveis, descrições para leitores de tela.
	•	Responsivo: desktop com grid de 2–3 colunas; empilhar seções em mobile; gráficos fluidos.

Estrutura da página /statistics
	1.	Cabeçalho da Página
	•	Título "Estatísticas" + descrição curta ("Resumo analítico de propriedades").
	•	Mostrar filtros ativos como chips (removíveis) e botão "Limpar filtros".
	2.	Painel de Filtros (colapsável)
	•	Deve refletir todos os filtros suportados pela API (ex.: country, market, property_type, price_min/max, accommodates_min/max, review_score_min, amenities_any, datas se aplicável).
	•	Interação: aplicar ao mudar, com debounce; botões "Aplicar" e "Restaurar".
	•	Persistir filtros em querystring/localStorage para manter estado ao recarregar/navegar.
	3.	Widgets / Gráficos (Chart.js)
Consumir em tempo real os 6 endpoints e representar dados prontos para gráficos.
	•	Visão geral (cards KPI) → GET /api/stats/overview
	•	Cards com: total de propriedades, preço médio, total de reviews/média.
	•	Distribuição de preços (barras) → GET /api/stats/price-distribution
	•	Barras com buckets; tooltip com faixa e contagem; opção de mudar tamanho do bucket.
	•	Tipos de propriedade (donut/pie) → GET /api/stats/property-types
	•	Categorias principais + "outros"; mostrar % e contagem.
	•	Capacidade de hóspedes (linhas ou barras) → GET /api/stats/accommodates
	•	Eixo X = # hóspedes; Eixo Y = # de listagens.
	•	Disponibilidade (radar ou barras agrupadas) → GET /api/stats/availability
	•	Mostrar médias availability_30/60/90/365.
	•	Pontuações de reviews (histograma ou barras) → GET /api/stats/review-scores
	•	Distribuição e média; destacar média/mediana.

Boas Práticas do Chart.js
	•	Legibilidade: títulos curtos, rótulos rotacionados apenas se necessário, tooltips claros.
	•	Cores: paleta verde para séries/acentos (variar opacidade para estados hover/active).
	•	Interações: tooltips, legendas clicáveis para esconder/mostrar séries; animações suaves (respeitar prefers-reduced-motion).
	•	Escalas: auto-sugeridas; limites e ticks amigáveis (sem ruído).
	•	Vazio/erros: mostrar placeholders ("Sem dados com esses filtros"), mensagens de erro amigáveis e opção de tentar novamente.

Integração com Filtros (obrigatório)
	•	Todos os widgets devem reenviar filtros ativos como parâmetros de consulta aos endpoints.
	•	Atualizar gráficos ao mudar filtros; indicar carregamento por widget (skeleton/spinner).
	•	Evitar chamadas redundantes (debounce e memoização por combinação de filtros).

Performance e Estado
	•	Camada de estado local para filtros e resultados; cache de respostas por filtersKey.
	•	Limite de concorrência para chamadas simultâneas; cancelar requisições obsoletas ao mudar filtros.
	•	Tratar loading, error, empty de forma consistente e visualmente clara.

Conteúdo Adicional (opcional, se couber sem saturar)
	•	Mini seção "Exportar" com download JSON/CSV por widget (se API permitir).
	•	Nota de fonte de dados/data de geração (generated_at).

Critérios de Aceitação
	•	A navbar mostra "Estatísticas" à direita e navega para /statistics corretamente.
	•	O dashboard parece ótimo (minimalista, acentos verdes, consistente com a marca) e é responsivo.
	•	Os 6 widgets consomem os 6 endpoints definidos e atualizam ao mudar filtros.
	•	Filtros persistentes e visíveis; estados loading/error/empty implementados.
	•	Gráficos claros, úteis e bem praticados (tooltips/legendas/animações suaves).
	•	Acessibilidade e performance razoáveis em desktop e mobile.

Escopo
	•	Apenas Frontend/SPA e conexão com endpoints existentes. Não criar novos endpoints.
	•	Sem exemplos de código, mas implementar seguindo essas especificações.
