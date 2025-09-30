---
description: Módulo de estadísticas de la app
auto_execution_mode: 1
---

Tarea
Agregar en la Home un botón de “Estadísticas” en el navbar, ubicado arriba a la derecha, que al hacer clic navegue a /statistics. Crear la página Statistics como un dashboard minimalista, muy bien diseñado, con colores verdes, que use Chart.js para renderizar gráficas que consumen los 6 endpoints del módulo de estadísticas creado previamente. Debe aprovechar todos los filtros disponibles en la API y ser comprehensivo, útil y responsive.

REVISA EL API PARA PODER CONSTRUIR LA INTERFAZ Y EL CÓDIGO DE REACT PARA QUE COINCIDA TODO PERFECTAMENTE, REVISA LAS RUTAS, SUS PARÁMETROS Y RESPUESTAS


Requisitos de navegación
	•	En el navbar (parte superior, alineación a la derecha) agregar un botón/ítem “Estadísticas”.
	•	Al hacer clic → navegar a la ruta /statistics (SPA).
	•	Mantener el estilo visual consistente con la marca existente (tipografía, espaciado, glass/soft shadows si aplica).

Diseño y look & feel (UI/UX)
	•	Estilo minimalista, premium, limpio: mucho aire, jerarquía clara, tipografía legible.
	•	Paleta: base blancos y grises suaves; acentos en verdes (variar intensidades para estados/series).
	•	Accesibilidad: contraste AA, tamaños legibles, estados focus/hover visibles, descripciones para lectores de pantalla.
	•	Responsive: desktop con grid de 2–3 columnas; en mobile apilar secciones; charts fluidos.

Estructura de la página /statistics
	1.	Header de página
	•	Título “Estadísticas” + descripción corta (“Resumen analítico de propiedades”).
	•	Mostrar filtros activos como chips (removibles) y botón “Limpiar filtros”.
	2.	Panel de filtros (colapsable)
	•	Debe reflejar todos los filtros soportados por la API (p. ej. country, market, property_type, price_min/max, accommodates_min/max, review_score_min, amenities_any, fechas si aplica).
	•	Interacción: aplicar al cambiar, con debounce; botón “Aplicar” y “Restablecer”.
	•	Persistir filtros en querystring/localStorage para mantener estado al recargar/navegar.
	3.	Widgets / Gráficas (Chart.js)
Consumir en tiempo real los 6 endpoints y representar datos listos para graficar.
	•	Overview (cards KPI) → GET /api/stats/overview
	•	Cards con: propiedades totales, precio promedio, reviews totales/promedio.
	•	Distribución de precios (barras) → GET /api/stats/price-distribution
	•	Barras con buckets; tooltip con rango y conteo; opción de cambiar tamaño de bucket.
	•	Tipos de propiedad (donut/pie) → GET /api/stats/property-types
	•	Top categorías + “otros”; mostrar % y conteo.
	•	Capacidad de huéspedes (líneas o barras) → GET /api/stats/accommodates
	•	Eje X = # huéspedes; eje Y = cantidad de listings.
	•	Disponibilidad (radar o barras agrupadas) → GET /api/stats/availability
	•	Mostrar promedios availability_30/60/90/365.
	•	Puntuaciones de reviews (histograma o barras) → GET /api/stats/review-scores
	•	Distribución y promedio; resaltar media/mediana.

Mejores prácticas de Chart.js
	•	Legibilidad: títulos cortos, etiquetas rotadas solo si es necesario, tooltips claros.
	•	Colores: gama de verdes para series/acentos (variar opacidad para estados hover/active).
	•	Interacciones: tooltips, leyendas clicables para ocultar/mostrar series; animaciones suaves (respetar prefers-reduced-motion).
	•	Escalas: auto-sugeridas; límites y ticks humanos (sin ruido).
	•	Vacíos/errores: mostrar placeholders (“Sin datos con estos filtros”), mensajes de error amigables y opción de reintentar.

Integración con filtros (obligatorio)
	•	Todos los widgets deben reenviar los filtros activos como query params a los endpoints.
	•	Actualizar charts al cambiar filtros; indicar loading por widget (skeleton/spinner).
	•	Evitar llamadas redundantes (debounce y memoización por combinación de filtros).

Rendimiento y estado
	•	Capa de estado local para filtros y resultados; cachear respuestas por filtersKey.
	•	Límite de concurrencia para llamadas simultáneas; cancelar solicitudes obsoletas al cambiar filtros.
	•	Manejar loading, error, empty de forma consistente y visualmente clara.

Contenido adicional (opcional, si cabe sin saturar)
	•	Mini sección “Exportar” con descarga JSON/CSV por widget (si API lo permite).
	•	Nota de fuente de datos/fecha de generación (generated_at).

Criterios de aceptación
	•	El navbar muestra “Estadísticas” a la derecha y navega a /statistics correctamente.
	•	El dashboard se ve muy bien (minimalista, acentos verdes, coherente con la marca) y es responsive.
	•	Los 6 widgets consumen los 6 endpoints definidos y se actualizan al cambiar filtros.
	•	Filtros persistentes y visibles; estados de loading/error/empty implementados.
	•	Charts claros, útiles y con buenas prácticas de Chart.js (tooltips/leyendas/animaciones suaves).
	•	Accesibilidad y rendimiento razonables en desktop y mobile.

Alcance
	•	Solo Frontend/SPA y wiring a los endpoints existentes. No crear endpoints nuevos.
	•	Sin ejemplos de código, pero implementar siguiendo estas especificaciones.