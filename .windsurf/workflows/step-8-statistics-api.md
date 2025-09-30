---
description: Statistics Module for the API
auto_execution_mode: 1
---

/step-8-statistics-api
ONE SHOT — Implement the statistics module (API) with 7 endpoints and validate with CURL commands (without .sh scripts)

Objective: Create /api/v1/stats ready for production with 7 endpoints and uniform JSON responses, consistent filters, correct Decimal128 conversion (without using routes like price.$numberDecimal), and a manual verification guide using CURL.

Scope and conventions:
	•	Prefix: /api/v1/stats
	•	Folder pattern: routes → controllers → services (no logic in routes)
	•	Uniform JSON response: statusCode, message, meta.filters, generated_at, data
	•	Errors: brief and consistent code and message (e.g., code: "STATS_ERROR")
	•	Decimal128: convert in aggregations with $toDouble($ifNull(["$price", 0])) or $toDouble($toString("$price")); NEVER access price.$numberDecimal
	•	Validate/normalize query params; reflect them exactly as applied in meta.filters
	•	Small responses ready for charts

Endpoints (7):
	1.	GET /overview → KPIs: totalProperties, avgPrice, medianPrice (if feasible), avgReviews
	2.	GET /price-distribution → price buckets { range, count } (useful and ordered ranges)
	3.	GET /property-types → { type, count, percentage } over the filtered total
	4.	GET /accommodates → { accommodates, count } ascending order
	5.	GET /availability → averages d30, d60, d90, d365 (use availability_*)
	6.	GET /review-scores → avgRating and/or score buckets by rating range
	7.	GET /filter-options → unique lists for selects (countries, markets, property_types, room_types, amenities) and suggested ranges (price, accommodates, bedrooms, bathrooms, review_score) + date range (first_review/last_review). Sorted, no duplicates and UI-ready

Common filters (apply to all 7 endpoints; combined with AND):
	•	country, market
	•	property_type (multiple by comma), room_type
	•	price_min, price_max (use priceValue converted to number)
	•	accommodates_min, accommodates_max
	•	bedrooms_min, bedrooms_max, bathrooms_min, bathrooms_max
	•	review_score_min
	•	amenities_any (multiple by comma; internal OR between amenities)
	•	review_date_from, review_date_to (use reviews.date or last_review)
	•	Invalid inputs are safely ignored; include in meta.filters what actually applied

Best practices (mandatory):
	•	Create derived field priceValue in the pipeline with $toDouble (and $toString if necessary)
	•	Early $match, minimal $project, efficient pipelines
	•	Handle nulls/missing values; return coherent data even if there are no results
	•	Stable and self-explanatory keys in data (buckets, items, points, d30/d60/d90/d365, etc.)
	•	Brief documentation of the module and accepted filters

Manual verification with CURL (without scripts):
Use BASE="http://localhost:3000" or the appropriate one. Each command should return HTTP 200 and contain the indicated minimum keys. Run without filters and with representative filters.
	1.	Overview (without filters) — verify: data.totalProperties, data.avgPrice, data.avgReviews
curl -s "$BASE/api/v1/stats/overview"
	2.	Overview (with filters) — example: country, price_min/max, amenities_any
curl -s "$BASE/api/v1/stats/overview?country=Portugal&price_min=50&price_max=300&amenities_any=Wifi,Kitchen"
	3.	Price distribution — verify: data.buckets (list with range, count)
curl -s "$BASE/api/v1/stats/price-distribution"
	4.	Property types — verify: data.items (type, count, percentage)
curl -s "$BASE/api/v1/stats/property-types?market=Porto"
	5.	Accommodates — verify: data.points (accommodates, count ascending order)
curl -s "$BASE/api/v1/stats/accommodates?accommodates_min=2&accommodates_max=10"
	6.	Availability — verify: data.d30, data.d60, data.d90, data.d365
curl -s "$BASE/api/v1/stats/availability"
	7.	Review scores — verify: data.avgRating and/or data.buckets
curl -s "$BASE/api/v1/stats/review-scores?review_score_min=80"
	8.	Filter options — verify: data.countries, data.markets, data.property_types, data.room_types, data.amenities, data.ranges.price.min/max
curl -s "$BASE/api/v1/stats/filter-options"

Acceptance criteria:
	•	The 7 endpoints respond 200 with uniform structure (statusCode, message, meta.filters, generated_at, data)
	•	filter-options returns usable lists and ranges (no duplicates, sorted)
	•	Filters are correctly applied and reflected in meta.filters
	•	Decimal128 correctly handled (no routes with $ in field names)
	•	Brief documentation included (routes, filters, CURL guide)


RUN THE BACKEND PROJECT
AT THE END USE CURL COMMANDS TO VERIFY THAT EACH ENDPOINT IS WORKING PROPERLY
