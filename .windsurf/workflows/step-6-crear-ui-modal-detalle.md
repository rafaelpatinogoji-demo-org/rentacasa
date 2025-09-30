---
description: Crear un modal del detalle
auto_execution_mode: 1
---

Step 6 — Modal de Propiedad (MUY VISUALLY APPEALING)

VER REFERENCIA "ui/modal.png"

Objetivo:
Cuando el usuario haga clic en una propiedad del listado, abrir un modal que se sienta premium, minimalista y MUY VISUALLY APPEALING. Debe transmitir cuidado por los detalles, claridad y una experiencia moderna.

Qué debe ocurrir
	•	Al hacer clic en una card de propiedad, se abre un modal centrado.
	•	El fondo del sitio se ve ligeramente oscuro y con desenfoque (blur) para dar protagonismo al modal.
	•	El modal tiene esquinas muy redondeadas, sensación de ligereza y orden.

Diseño del modal (estructura)
	•	Dos partes claramente diferenciadas:
	•	Izquierda: una columna con la imagen principal del establecimiento, que llene el alto visible del modal y tenga las esquinas redondeadas acordes al estilo general.
	•	Derecha: una columna con los detalles completos de la propiedad (nombre, ubicación, tipo, precio, amenities, resumen/descrición, capacidad, reglas, link externo, etc.). Presentar la información con jerarquía visual clara y espaciado generoso.

Estilo visual (look & feel)
	•	MUY VISUALLY APPEALING: limpio, moderno, elegante, con tipografía legible, espacios en múltiplos de 8/12/16, y sombra sutil para dar profundidad.
	•	Paleta: base blanco y acentos en verde azulado elegante; badges en colores pasteles suaves (rosa, menta, amarillo claro, lavanda, durazno). Evitar azules brillantes.
	•	Detalles que elevan la experiencia:
	•	Micro-interacciones suaves al abrir/cerrar.
	•	Texto de apoyo (p. ej., “/noche”, “hab”) en tono gris medio para no competir con el contenido principal.
	•	Botón o enlace “Ver más” para expandir descripción larga.

Animación
	•	Apertura suave y agradable (fade + ligera traducción/escala) que comunique calidad.
	•	Cierre consistente. Considerar preferencias de usuario que desactivan animaciones.

Accesibilidad y responsive
	•	El modal debe funcionar bien en mobile y desktop (dos columnas en desktop; en mobile se apilan imagen arriba y detalles abajo).
	•	Texto con contraste adecuado y enfoque de teclado correcto.
	•	Botón claro para Cerrar.

⸻

Datos y contenido (revisar endpoint + modelo)

Revisar el endpoint correspondiente para obtener la información completa de la propiedad seleccionada (por ejemplo, usando un listing_id). Asegurarse de traer todos los campos necesarios antes de abrir el modal para mostrarlo completo y sin parpadeos.

Modelo de datos de referencia (campos útiles a mostrar):
	•	Identificación y links: _id, listing_url
	•	Titular: name
	•	Resumen / descripción: summary (y description como respaldo)
	•	Ubicación: address.street, address.market, address.country
	•	Tipo: property_type, room_type, bed_type
	•	Capacidad: accommodates, bedrooms, beds, bathrooms.$numberDecimal
	•	Precio y extras: price.$numberDecimal, cleaning_fee.$numberDecimal, extra_people.$numberDecimal, guests_included.$numberDecimal
	•	Amenidades: amenities (seleccionar las más relevantes para chips/etiquetas)
	•	Política/Reglas: cancellation_policy, house_rules
	•	Imagen principal: images.picture_url
	•	Host (opcional): host.host_name, host_response_rate, host_is_superhost

Nota: El modal debe priorizar lo esencial primero (nombre, imagen, precio, tipo, ubicación) y luego mostrar detalles adicionales de forma ordenada y agradable.

⸻

Presentación sugerida dentro del modal
	1.	Encabezado derecho: Nombre (destacado) y ubicación breve.
	2.	Bloque de precio: Precio por noche con etiqueta “/noche” en texto secundario.
	3.	Badges: tipo de propiedad y habitaciones (ej. “3 hab”), en pasteles suaves.
	4.	Descripción: resumen compacto con opción de expandir.
	5.	Amenidades clave: 6–10 chips bonitas y consistentes.
	6.	Capacidad y reglas: datos claros y concisos (iconos opcionales).
	7.	Acción: botón principal (p. ej., “Reservar”  y link externo.

⸻

Criterios de éxito
	•	El modal se percibe premium y MUY VISUALLY APPEALING desde el primer instante.
	•	El fondo queda oscurecido y con blur para enfocar la atención.
	•	Imagen izquierda y detalles derecha se leen con jerarquía y aire.
	•	Datos completos y consistentes con el endpoint consultado para la propiedad seleccionada.
	•	Comportamiento responsive impecable (dos columnas en desktop; apilado en mobile).