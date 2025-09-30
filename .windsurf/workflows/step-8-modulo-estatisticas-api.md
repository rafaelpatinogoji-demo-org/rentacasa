---
description: Módulo de Estatísticas para a API
auto_execution_mode: 1
---

/step-8-modulo-estatisticas-api
UMA VEZ — Implemente o módulo de estatísticas (API) com 7 endpoints e valide com comandos CURL (sem scripts .sh)

Objetivo: Criar /api/v1/stats pronto para produção com 7 endpoints e respostas JSON uniformes, filtros consistentes, conversão correta do Decimal128 (sem usar rotas tipo price.$numberDecimal), e um guia de verificação manual usando CURL.

Escopo e convenções:
	•	Prefixo: /api/v1/stats
	•	Padrão de pastas: routes → controllers → services (sem lógica nas rotas)
	•	Resposta JSON uniforme: statusCode, message, meta.filters, generated_at, data
	•	Erros: code e message breves e consistentes (ex.: code: "STATS_ERROR")
	•	Decimal128: converter nas agregações com $toDouble($ifNull(["$price", 0])) ou $toDouble($toString("$price")); NUNCA acessar price.$numberDecimal
	•	Validar/normalizar parâmetros de consulta; refleti-los exatamente como aplicados em meta.filters
	•	Respostas pequenas e prontas para gráficos

Endpoints (7):
	1.	GET /overview → KPIs: totalProperties, avgPrice, medianPrice (se viável), avgReviews
	2.	GET /price-distribution → buckets de preço { range, count } (faixas úteis e ordenadas)
	3.	GET /property-types → { type, count, percentage } sobre o total filtrado
	4.	GET /accommodates → { accommodates, count } ordem ascendente
	5.	GET /availability → médias d30, d60, d90, d365 (usar availability_*)
	6.	GET /review-scores → avgRating e/ou buckets por faixa de pontuação
	7.	GET /filter-options → listas únicas para selects (countries, markets, property_types, room_types, amenities) e faixas sugeridas (price, accommodates, bedrooms, bathrooms, review_score) + faixa de datas (first_review/last_review). Ordenado, sem duplicados e apto para UI

Filtros comuns (aplicam-se aos 7 endpoints; combinados com AND):
	•	country, market
	•	property_type (múltiplos por vírgula), room_type
	•	price_min, price_max (usar priceValue convertido para número)
	•	accommodates_min, accommodates_max
	•	bedrooms_min, bedrooms_max, bathrooms_min, bathrooms_max
	•	review_score_min
	•	amenities_any (múltiplos por vírgula; OR interno entre amenities)
	•	review_date_from, review_date_to (usar reviews.date ou last_review)
	•	Entradas inválidas são ignoradas com segurança; incluir em meta.filters o que realmente foi aplicado

Boas práticas (obrigatórias):
	•	Criar campo derivado priceValue no pipeline com $toDouble (e $toString se necessário)
	•	$match inicial, $project mínimo, pipelines eficientes
	•	Tratar nulos/faltantes; devolver dados coerentes mesmo sem resultados
	•	Chaves estáveis e autoexplicativas em data (buckets, items, points, d30/d60/d90/d365, etc.)
	•	Documentação breve do módulo e dos filtros aceitos

Verificação manual com CURL (sem scripts):
Usar BASE="http://localhost:3000" ou a apropriada. Cada comando deve devolver HTTP 200 e conter as chaves mínimas indicadas. Executar sem filtros e com filtros representativos.
	1.	Overview (sem filtros) — verificar: data.totalProperties, data.avgPrice, data.avgReviews
curl -s "$BASE/api/v1/stats/overview"
	2.	Overview (com filtros) — exemplo: country, price_min/max, amenities_any
curl -s "$BASE/api/v1/stats/overview?country=Portugal&price_min=50&price_max=300&amenities_any=Wifi,Kitchen"
	3.	Distribuição de preços — verificar: data.buckets (lista com range, count)
curl -s "$BASE/api/v1/stats/price-distribution"
	4.	Tipos de propriedade — verificar: data.items (type, count, percentage)
curl -s "$BASE/api/v1/stats/property-types?market=Porto"
	5.	Accommodates — verificar: data.points (accommodates, count ordem ascendente)
curl -s "$BASE/api/v1/stats/accommodates?accommodates_min=2&accommodates_max=10"
	6.	Disponibilidade — verificar: data.d30, data.d60, data.d90, data.d365
curl -s "$BASE/api/v1/stats/availability"
	7.	Pontuações de reviews — verificar: data.avgRating e/ou data.buckets
curl -s "$BASE/api/v1/stats/review-scores?review_score_min=80"
	8.	Opções de filtros — verificar: data.countries, data.markets, data.property_types, data.room_types, data.amenities, data.ranges.price.min/max
curl -s "$BASE/api/v1/stats/filter-options"

Critérios de aceitação:
	•	Os 7 endpoints respondem 200 com estrutura uniforme (statusCode, message, meta.filters, generated_at, data)
	•	filter-options devolve listas e faixas utilizáveis (sem duplicados, ordenados)
	•	Os filtros são aplicados corretamente e refletidos em meta.filters
	•	Decimal128 tratado corretamente (sem rotas com $ em nomes de campos)
	•	Documentação breve incluída (rotas, filtros, guia CURL)


EXECUTE O PROJETO DO BACKEND
NO FINAL USE COMANDOS CURL PARA VERIFICAR SE CADA ENDPOINT ESTÁ FUNCIONANDO CORRETAMENTE
