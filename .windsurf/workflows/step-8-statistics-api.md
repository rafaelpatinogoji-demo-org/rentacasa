---
description: Módulo de Estadísticas para la API
auto_execution_mode: 1
---

/step-8-statistics-api
ONE SHOT — Implementa el módulo de estadísticas (API) con 7 endpoints y valida con comandos CURL (sin scripts .sh)

Objetivo: Crear /api/v1/stats listo para producción con 7 endpoints y respuestas JSON uniformes, filtros consistentes, conversión correcta de Decimal128 (sin usar rutas tipo price.$numberDecimal), y una guía de verificación manual mediante CURL.

Alcance y convenciones:
	•	Prefijo: /api/v1/stats
	•	Patrón de carpetas: routes → controllers → services (sin lógica en rutas)
	•	Respuesta JSON uniforme: statusCode, message, meta.filters, generated_at, data
	•	Errores: code y message breves y consistentes (p.ej., code: “STATS_ERROR”)
	•	Decimal128: convertir en agregaciones con $toDouble($ifNull([”$price”, 0])) o $toDouble($toString(”$price”)); NUNCA acceder a price.$numberDecimal
	•	Validar/normalizar query params; reflejarlos tal cual aplicaron en meta.filters
	•	Respuestas pequeñas y listas para gráficas

Endpoints (7):
	1.	GET /overview → KPIs: totalProperties, avgPrice, medianPrice (si es factible), avgReviews
	2.	GET /price-distribution → buckets de precio { range, count } (rangos útiles y ordenados)
	3.	GET /property-types → { type, count, percentage } sobre el total filtrado
	4.	GET /accommodates → { accommodates, count } orden ascendente
	5.	GET /availability → promedios d30, d60, d90, d365 (usar availability_*)
	6.	GET /review-scores → avgRating y/o buckets por rango de puntuación
	7.	GET /filter-options → listas únicas para selects (countries, markets, property_types, room_types, amenities) y rangos sugeridos (price, accommodates, bedrooms, bathrooms, review_score) + rango de fechas (first_review/last_review). Ordenado, sin duplicados y apto para UI

Filtros comunes (aplican a los 7 endpoints; combinados con AND):
	•	country, market
	•	property_type (múltiples por coma), room_type
	•	price_min, price_max (usar priceValue convertido a número)
	•	accommodates_min, accommodates_max
	•	bedrooms_min, bedrooms_max, bathrooms_min, bathrooms_max
	•	review_score_min
	•	amenities_any (múltiples por coma; OR interno entre amenities)
	•	review_date_from, review_date_to (usar reviews.date o last_review)
	•	Inputs inválidos se ignoran de forma segura; incluir en meta.filters lo realmente aplicado

Buenas prácticas (obligatorias):
	•	Crear campo derivado priceValue en el pipeline con $toDouble (y $toString si es necesario)
	•	$match temprano, $project mínimo, pipelines eficientes
	•	Manejar nulos/faltantes; devolver data coherente aunque no haya resultados
	•	Claves estables y autoexplicativas en data (buckets, items, points, d30/d60/d90/d365, etc.)
	•	Documentación breve del módulo y de los filtros aceptados

Verificación manual con CURL (sin scripts):
Usar BASE=“http://localhost:3000” o la que corresponda. Cada comando debe devolver HTTP 200 y contener las claves mínimas indicadas. Ejecutar sin filtros y con filtros representativos.
	1.	Overview (sin filtros) — verificar: data.totalProperties, data.avgPrice, data.avgReviews
curl -s “$BASE/api/v1/stats/overview”
	2.	Overview (con filtros) — ejemplo: country, price_min/max, amenities_any
curl -s “$BASE/api/v1/stats/overview?country=Portugal&price_min=50&price_max=300&amenities_any=Wifi,Kitchen”
	3.	Price distribution — verificar: data.buckets (lista con range, count)
curl -s “$BASE/api/v1/stats/price-distribution”
	4.	Property types — verificar: data.items (type, count, percentage)
curl -s “$BASE/api/v1/stats/property-types?market=Porto”
	5.	Accommodates — verificar: data.points (accommodates, count orden ascendente)
curl -s “$BASE/api/v1/stats/accommodates?accommodates_min=2&accommodates_max=10”
	6.	Availability — verificar: data.d30, data.d60, data.d90, data.d365
curl -s “$BASE/api/v1/stats/availability”
	7.	Review scores — verificar: data.avgRating y/o data.buckets
curl -s “$BASE/api/v1/stats/review-scores?review_score_min=80”
	8.	Filter options — verificar: data.countries, data.markets, data.property_types, data.room_types, data.amenities, data.ranges.price.min/max
curl -s “$BASE/api/v1/stats/filter-options”

Criterios de aceptación:
	•	Los 7 endpoints responden 200 con estructura uniforme (statusCode, message, meta.filters, generated_at, data)
	•	filter-options devuelve listas y rangos utilizables (sin duplicados, ordenados)
	•	Los filtros se aplican correctamente y se reflejan en meta.filters
	•	Decimal128 tratado correctamente (sin rutas con $ en nombres de campo)
	•	Documentación breve incluida (rutas, filtros, guía CURL)


EJECUTA EL PROYECTO DE BACKEND
AL FINAL USA COMANDOS CURL PARA VERIFICAR QUE CADA UNO DE LOS ENDPOINT ESTÉ FUNCIONANDO BIEN