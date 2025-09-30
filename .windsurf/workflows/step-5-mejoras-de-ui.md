---
description: Mejorar el UI usando CSS
auto_execution_mode: 1
---

Step 5 — Rediseñar UI con Estilo RentaCasa Moderno y Glassmorphism Header

TIENES QUE REVISAR LA IMAGEN DE REFERENCIA EN ui/design.png

ES REFERENCIA, no te tienes que apegar perfectamente

Objetivo:
Transformar el frontend actual inspirándote en el diseño de RentaCasa con un header glassmorphism fixed que usa backdrop-filter para efecto de vidrio esmerilado translúcido. Crear una aplicación visualmente atractiva, profesional y moderna.

⸻

Instrucciones para Cascade

Header Glassmorphism Component — CRÍTICO

Crea un componente Header con efecto glassmorphism que debe estar position fixed, top: 0, width: 100%, y z-index: 1000 o superior para mantenerse siempre visible al hacer scroll.

Propiedades CSS exactas:
	•	background: rgba(61, 90, 90, 0.7) (verde azulado oscuro con alpha 0.6–0.8)
	•	backdrop-filter: blur(10px) saturate(180%)
	•	-webkit-backdrop-filter: blur(10px) saturate(180%)
	•	border-bottom: 1px solid rgba(255, 255, 255, 0.1)
	•	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

Contenido del header:
	•	Emoji 🏡 + texto “RentaCasa” blanco bold (24–28px)
	•	Subtítulo “Construido con Windsurf” rgba(255, 255, 255, 0.7), tamaño 14px
	•	Padding vertical 16–20px
	•	Container Bootstrap centrado con max-width

⸻

Ajuste del Layout Principal

Agrega padding-top: 100px–120px al body o contenedor principal para compensar el header fijo.

⸻

Esquema de Colores y Brand
	•	Header: verde azulado oscuro translúcido.
	•	Fondo general: gris muy claro #f5f5f5 o #f8f8f8.
	•	Cards: blancas con sombras sutiles, border-radius 12–16px.

Badges: SOLO colores pasteles (jamás azul brillante):
	•	Rosa claro #ffc4d6 (texto #b8405e)
	•	Verde menta #c4f0e0 (texto #2d8b6b)
	•	Amarillo claro #fff4c4 (texto #a89b3d)
	•	Lavanda #e4d4f4 (texto #7b5a9e)
	•	Durazno #ffd4b8 (texto #b86f3d)

⸻

Contador de Resultados

Debajo del header: "5555 propiedades encontradas".
Estilo: gris medio, font-size 14px, margin-bottom 16px.

⸻

FilterSidebar
	•	Fondo blanco, border-radius 12px, sombra ligera, padding 24–32px.
	•	Sticky con top: 120px.
	•	Labels en español bold pequeños: ¿Dónde?, Tipo, Habitaciones.
	•	Selects: fondo gris claro #f8f8f8, border-radius 8px, padding 10px 16px.
	•	Botón búsqueda: pill radius 99em, fondo verde azulado #5a8a8a, texto blanco “🔍 BUSCAR”, ancho completo. Hover: más oscuro.
	•	Texto “Próximamente disponible” debajo, gris claro, centrado.

⸻

ListingCard
	•	Cards horizontales:
	•	Imagen izquierda 35–40% ancho, border-radius esquinas izquierdas, object-fit: cover.
	•	Contenido derecho con padding 20px.
	•	Título bold negro 18–20px.
	•	Ubicación gris medio 14px debajo.
	•	2 badges pasteles suaves (property_type + habitaciones con “hab”).
	•	Precio verde azulado bold 32–36px, alineado derecha, “/noche” en gris 14px.
	•	Cards con fondo blanco, sombra sutil, hover con sombra más fuerte y translateY(-2px) (transition 200ms).

⸻

Grid de Cards — CRÍTICO

⚠️ IMPORTANTE: Las propiedades deben mostrarse SIEMPRE en un grid de 2 columnas en desktop.
	•	Usa Row + Col md={6} con gap: 24px.
	•	En mobile colapsa a 1 columna.
	•	Nunca en desktop se debe mostrar en 1 sola columna: siempre 2 columnas de cards horizontales.

⸻

Typography Profesional

Sans-serif moderna.
	•	Títulos cards: bold 18–20px
	•	Ubicaciones: 14px
	•	Precios: bold 32–36px
	•	Badges: 13–14px
	•	Labels filtros: semibold 14px

⸻

Responsive
	•	Header fijo en mobile (texto ajustado).
	•	Sidebar colapsa o se mueve arriba.
	•	Cards mantienen layout horizontal.
	•	Breakpoints Bootstrap.

⸻

Principios de UI Moderna con Glassmorphism
	•	backdrop-filter blur + saturate.
	•	Spacing múltiplos de 4/8.
	•	Sombras sutiles.
	•	Transiciones 200–300ms.
	•	Jerarquía visual clara.
	•	Contraste accesible.
	•	Colores armoniosos.

⸻

Resultado esperado:
Un frontend con header translúcido glassmorphism fijo que se mantiene visible al hacer scroll con contenido borroso detrás. Sidebar limpio, contador visible, y grid de propiedades SIEMPRE en 2 columnas en desktop (1 columna en mobile). Diseño moderno, cohesivo, responsive y profesional.