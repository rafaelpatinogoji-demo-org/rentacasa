---
description: Crear Frontend React para Consumir API de Listings de Airbnb
auto_execution_mode: 1
---

Step 4 — Crear Frontend React Inicial para Listings de Airbnb (Sin Funcionalidad de Filtros)
Objetivo: Crear una interfaz en /app usando React TypeScript y React-Bootstrap con layout de dos columnas. Columna izquierda con filtros sin funcionalidad y columna derecha mostrando listings en cards con paginación funcional.
Instrucciones para Cascade:
Asegúrate de que /app ya tiene instalado react-bootstrap bootstrap y axios. Si no los tiene instálalos.
Crea interfaces TypeScript en /app/src/types o inline que coincidan exactamente con la estructura de respuesta del backend. IMPORTANTE: El backend retorna data.listings no data.docs y pagination con hasNextPage y hasPreviousPage no hasPrevPage. Define interfaces para Listing Pagination y ApiResponse para mantener type safety.
Crea un servicio en /app/src/services/listingService.ts que encapsule las llamadas a la API usando Axios. El servicio debe tener un método getAllListings con params de page y limit. La base URL debe ser http://localhost:3000/api/v1. Implementa manejo básico de errores. El servicio debe retornar la estructura completa con listings y pagination desde response.data.data.
Crea componentes React en /app/src/components:
Un componente ListingCard que reciba un listing como prop y lo muestre en un Card de React-Bootstrap. Debe mostrar imagen si está disponible o un placeholder, nombre del listing, tipo de propiedad property_type, precio por noche formateado desde el objeto Decimal128 de Mongo, número de habitaciones bedrooms, número de camas beds, y ciudad extraída de address.market o address.suburb o location según estructura. Hazlo visualmente atractivo con buen spacing y tipografía clara usando clases de Bootstrap.
Un componente FilterSidebar que renderice un panel de filtros en la columna izquierda. Debe incluir tres secciones de filtros SIN funcionalidad aún solo la UI:

Un Form.Select o lista para seleccionar ciudad con opciones de ejemplo
Un Form.Select o input para número de habitaciones con opciones comunes
Dos Form.Control type number para rango de precios mínimo y máximo

Usa componentes de Form de React-Bootstrap. Los filtros deben verse profesionales pero no necesitan hacer nada todavía. Agrega un título como "Filtros" en la parte superior del sidebar y un botón de "Aplicar Filtros" deshabilitado o sin funcionalidad.
Un componente CustomPagination que reciba currentPage totalPages hasNextPage hasPreviousPage y callbacks para onNext y onPrevious. Usa Pagination de React-Bootstrap con Pagination.Prev Pagination.Item y Pagination.Next. Deshabilita botones cuando no haya página siguiente o anterior basándote en los flags hasNextPage y hasPreviousPage no en cálculos manuales.
Actualiza /app/src/App.tsx para que sea la página principal con layout de dos columnas:
Usa Container Row y Col de React-Bootstrap para crear el layout. La columna izquierda debe ser Col md={3} para el FilterSidebar. La columna derecha debe ser Col md={9} para mostrar los listings.
Mantén estado para listings pagination loading y error usando useState con tipos TypeScript apropiados.
Al montar el componente carga la primera página de listings llamando getAllListings con page 1 y limit 12. Usa useEffect con array de dependencias vacío.
En la columna izquierda renderiza el FilterSidebar con fondo blanco o gris muy claro. En la columna derecha renderiza un título como "Propiedades Disponibles", después muestra un Spinner de React-Bootstrap centrado si está cargando, luego renderiza los ListingCards en una grid usando Row y Col sm={12} md={6} lg={4} para que sean responsive con 3 cards por fila en pantallas grandes, y finalmente el componente CustomPagination centrado al fondo.
Implementa las funciones handleNextPage y handlePreviousPage que actualicen el currentPage y llamen al servicio para cargar la nueva página de listings. Agrega scroll automático al top cuando cambie de página usando window.scrollTo.
Usa fondo gris claro #f8f9fa para el body y Cards blancos para los listings. El FilterSidebar debe tener fondo blanco o similar para distinguirse.
Implementa manejo de errores básico que muestre un Alert de React-Bootstrap variant danger si algo falla con el mensaje de error.
IMPORTANTE: Asegúrate de que los nombres de propiedades coincidan exactamente con lo que retorna el backend: listings no docs, hasNextPage no hasNext, hasPreviousPage no hasPrev.
Resultado esperado: El frontend en puerto 5173 muestra un layout de dos columnas. Izquierda con filtros que se ven bien pero no hacen nada todavía con opciones de ejemplo para ciudad habitaciones y precios. Derecha con grid responsive de listings en cards mostrando datos reales del backend incluyendo imágenes nombres precios ubicaciones y características. Paginación funcional que permite navegar entre las 463 páginas aproximadamente con 12 items por página. La UI es limpia responsive y profesional usando React-Bootstrap. Los 5555 listings se cargan correctamente desde el endpoint GET /api/v1/listings con scroll automático al cambiar de página.