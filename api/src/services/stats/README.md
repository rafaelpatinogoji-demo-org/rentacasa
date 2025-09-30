# Módulo de Estadísticas

Este módulo proporciona 7 endpoints para obtener estadísticas y análisis de los listings de Airbnb.

## Arquitectura

```
routes/statsRoutes.ts → controllers/statsController.ts → services/stats/statsService.ts
```

## Endpoints

### Base URL: `/api/v1/stats`

1. **GET /overview** - KPIs generales
   - Total de propiedades
   - Precio promedio
   - Precio mediano
   - Promedio de reseñas

2. **GET /price-distribution** - Distribución de precios en buckets
   - Rangos de precio predefinidos
   - Conteo por rango

3. **GET /property-types** - Distribución de tipos de propiedad
   - Tipo de propiedad
   - Conteo
   - Porcentaje del total

4. **GET /accommodates** - Distribución de capacidad
   - Capacidad (número de personas)
   - Conteo por capacidad

5. **GET /availability** - Promedios de disponibilidad
   - Disponibilidad a 30, 60, 90 y 365 días

6. **GET /review-scores** - Estadísticas de puntuaciones
   - Promedio de rating
   - Distribución por rangos de puntuación

7. **GET /filter-options** - Opciones disponibles para filtros UI
   - Listas de países, mercados, tipos de propiedad, etc.
   - Rangos numéricos (precio, capacidad, etc.)
   - Rango de fechas de reseñas

## Filtros Comunes

Todos los endpoints aceptan los siguientes query parameters:

### Filtros Categóricos
- `country` - País
- `market` - Mercado/ciudad
- `property_type` - Tipo(s) de propiedad (separados por coma)
- `room_type` - Tipo de habitación
- `amenities_any` - Amenidades (separadas por coma, OR interno)

### Filtros Numéricos
- `price_min`, `price_max`
- `accommodates_min`, `accommodates_max`
- `bedrooms_min`, `bedrooms_max`
- `bathrooms_min`, `bathrooms_max`
- `review_score_min`

### Filtros de Fecha
- `review_date_from`, `review_date_to` (formato ISO)

## Formato de Respuesta

Todas las respuestas siguen este formato estándar:

```typescript
{
  statusCode: 200,
  message: string,
  meta: {
    filters: StatsFilters,
    generated_at: string (ISO date)
  },
  data: T // Específico de cada endpoint
}
```

## Características Técnicas

### Conversión de Decimal128
Los precios en MongoDB están almacenados como `Decimal128`. El servicio los convierte automáticamente a números usando:

```javascript
$addFields: {
  priceValue: {
    $toDouble: {
      $ifNull: [
        {
          $cond: {
            if: { $eq: [{ $type: '$price' }, 'string'] },
            then: { $toDouble: '$price' },
            else: '$price'
          }
        },
        0
      ]
    }
  }
}
```

### Manejo de Valores Nulos
Todos los campos opcionales se manejan con `$ifNull` para evitar errores en las agregaciones.

### Optimización de Pipelines
- `$match` se aplica lo más temprano posible
- Proyecciones mínimas para reducir transferencia de datos
- Uso de índices existentes en campos filtrados

### Validación de Parámetros
El controlador valida y normaliza todos los parámetros de entrada:
- Conversión segura de strings a números
- Validación de fechas
- Filtrado de valores inválidos

## Índices Utilizados

El servicio aprovecha los siguientes índices del modelo `Listing`:

```typescript
{ property_type: 1, room_type: 1, beds: 1 }
{ price: 1, bedrooms: 1 }
{ 'address.country': 1, 'address.market': 1 }
```

## Ejemplos de Uso

### Obtener overview de apartamentos en Portugal
```bash
curl "http://localhost:3000/api/v1/stats/overview?country=Portugal&property_type=Apartment"
```

### Distribución de precios con filtros
```bash
curl "http://localhost:3000/api/v1/stats/price-distribution?price_min=50&price_max=300&market=Porto"
```

### Opciones de filtros para construir UI
```bash
curl "http://localhost:3000/api/v1/stats/filter-options"
```

## Manejo de Errores

Todos los endpoints capturan errores y devuelven:

```typescript
{
  statusCode: 500,
  message: string,
  error: {
    code: "STATS_ERROR",
    message: string
  }
}
```

## Testing

Para verificar todos los endpoints, consulta el archivo `STATS_VERIFICATION.md` en la raíz del proyecto API.
