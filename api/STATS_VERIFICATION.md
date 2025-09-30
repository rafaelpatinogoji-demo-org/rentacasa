# Verificación del Módulo de Estadísticas

Este documento contiene los comandos CURL para verificar manualmente los 7 endpoints del módulo de estadísticas.

## Configuración

```bash
BASE="http://localhost:3000"
```

## 1. Overview - Estadísticas generales

### Sin filtros
```bash
curl -s "$BASE/api/v1/stats/overview" | jq .
```

**Claves esperadas:** `data.totalProperties`, `data.avgPrice`, `data.medianPrice`, `data.avgReviews`

### Con filtros
```bash
curl -s "$BASE/api/v1/stats/overview?country=Portugal&price_min=50&price_max=300&amenities_any=Wifi,Kitchen" | jq .
```

## 2. Price Distribution - Distribución de precios

```bash
curl -s "$BASE/api/v1/stats/price-distribution" | jq .
```

**Claves esperadas:** `data.buckets` (lista con `range`, `min`, `max`, `count`)

### Con filtros
```bash
curl -s "$BASE/api/v1/stats/price-distribution?country=Spain&price_max=500" | jq .
```

## 3. Property Types - Tipos de propiedades

```bash
curl -s "$BASE/api/v1/stats/property-types" | jq .
```

**Claves esperadas:** `data.items` (lista con `type`, `count`, `percentage`)

### Con filtros
```bash
curl -s "$BASE/api/v1/stats/property-types?market=Porto" | jq .
```

## 4. Accommodates - Distribución de capacidad

```bash
curl -s "$BASE/api/v1/stats/accommodates" | jq .
```

**Claves esperadas:** `data.points` (lista con `accommodates`, `count` en orden ascendente)

### Con filtros
```bash
curl -s "$BASE/api/v1/stats/accommodates?accommodates_min=2&accommodates_max=10" | jq .
```

## 5. Availability - Disponibilidad promedio

```bash
curl -s "$BASE/api/v1/stats/availability" | jq .
```

**Claves esperadas:** `data.d30`, `data.d60`, `data.d90`, `data.d365`

### Con filtros
```bash
curl -s "$BASE/api/v1/stats/availability?country=Portugal&property_type=Apartment" | jq .
```

## 6. Review Scores - Puntuaciones de reseñas

```bash
curl -s "$BASE/api/v1/stats/review-scores" | jq .
```

**Claves esperadas:** `data.avgRating` y/o `data.buckets`

### Con filtros
```bash
curl -s "$BASE/api/v1/stats/review-scores?review_score_min=80" | jq .
```

## 7. Filter Options - Opciones de filtros para UI

```bash
curl -s "$BASE/api/v1/stats/filter-options" | jq .
```

**Claves esperadas:**
- `data.countries` (array)
- `data.markets` (array)
- `data.property_types` (array)
- `data.room_types` (array)
- `data.amenities` (array)
- `data.ranges` (objeto con `price`, `accommodates`, `bedrooms`, `bathrooms`, `review_score`)
- `data.dates` (objeto con `first_review`, `last_review`)

## Filtros Comunes

Todos los endpoints aceptan los siguientes filtros (se combinan con AND):

### Filtros de texto
- `country` - País (ej: "Portugal", "Spain")
- `market` - Mercado/ciudad (ej: "Porto", "Lisbon")
- `property_type` - Tipo de propiedad, múltiples separados por coma (ej: "Apartment,House")
- `room_type` - Tipo de habitación (ej: "Entire home/apt")
- `amenities_any` - Amenidades, múltiples separados por coma con OR interno (ej: "Wifi,Kitchen")

### Filtros numéricos
- `price_min`, `price_max` - Rango de precio
- `accommodates_min`, `accommodates_max` - Rango de capacidad
- `bedrooms_min`, `bedrooms_max` - Rango de dormitorios
- `bathrooms_min`, `bathrooms_max` - Rango de baños
- `review_score_min` - Puntuación mínima de reseñas

### Filtros de fecha
- `review_date_from`, `review_date_to` - Rango de fechas de reseñas (formato ISO)

## Ejemplos de Combinaciones

### Apartamentos en Portugal con precio entre 50-200€
```bash
curl -s "$BASE/api/v1/stats/overview?country=Portugal&property_type=Apartment&price_min=50&price_max=200" | jq .
```

### Propiedades con Wifi y cocina, mínimo 4 personas
```bash
curl -s "$BASE/api/v1/stats/property-types?amenities_any=Wifi,Kitchen&accommodates_min=4" | jq .
```

### Distribución de precios en Porto
```bash
curl -s "$BASE/api/v1/stats/price-distribution?market=Porto" | jq .
```

## Formato de Respuesta

Todas las respuestas siguen el formato estándar:

```json
{
  "statusCode": 200,
  "message": "Descripción del resultado",
  "meta": {
    "filters": { /* filtros aplicados */ },
    "generated_at": "2025-09-30T02:00:00.000Z"
  },
  "data": { /* datos específicos del endpoint */ }
}
```

## Manejo de Errores

En caso de error, la respuesta será:

```json
{
  "statusCode": 500,
  "message": "Descripción del error",
  "error": {
    "code": "STATS_ERROR",
    "message": "Detalle del error"
  }
}
```

## Notas Técnicas

1. **Conversión de Decimal128**: Los precios se convierten automáticamente a números usando `$toDouble` en las agregaciones
2. **Valores nulos**: Los valores nulos o faltantes se manejan con `$ifNull` para evitar errores
3. **Filtros inválidos**: Los parámetros inválidos se ignoran de forma segura
4. **Rendimiento**: Los pipelines están optimizados con `$match` temprano y proyecciones mínimas
5. **Índices**: Se aprovechan los índices existentes en `country`, `market`, `property_type`, etc.
