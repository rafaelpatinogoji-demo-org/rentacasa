---
description: Statistics module for the app
auto_execution_mode: 1
---

Task
Add a "Statistics" button in the Home navbar, located at the top right, that when clicked navigates to /statistics. Create the Statistics page as a minimalist dashboard, very well designed, with green colors, that uses Chart.js to render charts that consume the 6 endpoints of the statistics module created previously. It should leverage all available filters in the API and be comprehensive, useful and responsive.

CHECK THE API TO BE ABLE TO BUILD THE INTERFACE AND REACT CODE SO THAT EVERYTHING MATCHES PERFECTLY, CHECK THE ROUTES, THEIR PARAMETERS AND RESPONSES


Navigation Requirements
	•	In the navbar (top section, right alignment) add a "Statistics" button/item.
	•	When clicked → navigate to the /statistics route (SPA).
	•	Maintain consistent visual style with the existing brand (typography, spacing, glass/soft shadows if applicable).

Design and Look & Feel (UI/UX)
	•	Minimalist, premium, clean style: plenty of space, clear hierarchy, readable typography.
	•	Palette: white and soft gray base; green accents (vary intensities for states/series).
	•	Accessibility: AA contrast, readable sizes, visible focus/hover states, descriptions for screen readers.
	•	Responsive: desktop with 2–3 column grid; stack sections on mobile; fluid charts.

Structure of the /statistics page
	1.	Page Header
	•	Title "Statistics" + short description ("Analytical summary of properties").
	•	Show active filters as chips (removable) and "Clear filters" button.
	2.	Filter Panel (collapsible)
	•	Should reflect all filters supported by the API (e.g. country, market, property_type, price_min/max, accommodates_min/max, review_score_min, amenities_any, dates if applicable).
	•	Interaction: apply on change, with debounce; "Apply" and "Reset" buttons.
	•	Persist filters in querystring/localStorage to maintain state when reloading/navigating.
	3.	Widgets / Charts (Chart.js)
Consume in real time the 6 endpoints and represent ready-to-chart data.
	•	Overview (KPI cards) → GET /api/stats/overview
	•	Cards with: total properties, average price, total reviews/average.
	•	Price distribution (bars) → GET /api/stats/price-distribution
	•	Bars with buckets; tooltip with range and count; option to change bucket size.
	•	Property types (donut/pie) → GET /api/stats/property-types
	•	Top categories + "others"; show % and count.
	•	Guest capacity (lines or bars) → GET /api/stats/accommodates
	•	X axis = # guests; Y axis = # of listings.
	•	Availability (radar or grouped bars) → GET /api/stats/availability
	•	Show averages availability_30/60/90/365.
	•	Review scores (histogram or bars) → GET /api/stats/review-scores
	•	Distribution and average; highlight mean/median.

Chart.js Best Practices
	•	Readability: short titles, labels rotated only if necessary, clear tooltips.
	•	Colors: green palette for series/accents (vary opacity for hover/active states).
	•	Interactions: tooltips, clickable legends to hide/show series; smooth animations (respect prefers-reduced-motion).
	•	Scales: auto-suggested; human-friendly limits and ticks (no noise).
	•	Empty/errors: show placeholders ("No data with these filters"), friendly error messages and retry option.

Filter Integration (mandatory)
	•	All widgets must re-forward active filters as query params to the endpoints.
	•	Update charts when changing filters; indicate loading per widget (skeleton/spinner).
	•	Avoid redundant calls (debounce and memoization by filters combination).

Performance and State
	•	Local state layer for filters and results; cache responses by filtersKey.
	•	Concurrency limit for simultaneous calls; cancel obsolete requests when changing filters.
	•	Handle loading, error, empty consistently and visually clear.

Additional Content (optional, if it fits without saturating)
	•	Mini "Export" section with JSON/CSV download per widget (if API allows).
	•	Data source/date of generation note (generated_at).

Acceptance Criteria
	•	The navbar shows "Statistics" on the right and navigates to /statistics correctly.
	•	The dashboard looks great (minimalist, green accents, consistent with the brand) and is responsive.
	•	The 6 widgets consume the 6 defined endpoints and update when changing filters.
	•	Persistent and visible filters; implemented loading/error/empty states.
	•	Clear, useful and well-practiced charts (tooltips/legends/smooth animations).
	•	Reasonable accessibility and performance on desktop and mobile.

Scope
	•	Frontend/SPA only and wiring to existing endpoints. Do not create new endpoints.
	•	No code examples, but implement following these specifications.
