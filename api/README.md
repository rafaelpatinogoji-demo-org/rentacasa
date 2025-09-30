# Airbnb Listings API

API REST para consultar propiedades de Airbnb usando MongoDB y Mongoose.

## 🏗️ Arquitectura

```
/api
├── src/
│   ├── config/
│   │   └── database.ts         # Configuración MongoDB con retry logic
│   ├── models/
│   │   └── Listing.ts          # Modelo Mongoose para listingsAndReviews
│   ├── controllers/
│   │   └── listingController.ts # Lógica de negocio (CRUD)
│   ├── routes/
│   │   └── listingRoutes.ts    # Definición de endpoints
│   └── index.ts                # Punto de entrada de la aplicación
├── .env                        # Variables de entorno (NO versionar)
├── .env.example                # Plantilla de variables de entorno
├── tsconfig.json               # Configuración TypeScript
└── package.json                # Dependencias y scripts
```

## 📦 Stack Tecnológico

- **Node.js** 22 LTS
- **Express** 5.x - Framework web
- **TypeScript** 5.x - Tipado estático
- **Mongoose** 8.x - ODM para MongoDB
- **Helmet** - Seguridad HTTP headers
- **express-rate-limit** - Rate limiting
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

## ⚙️ Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env` y configura tus credenciales:

```bash
cp .env.example .env
```

Edita `.env` con tu URI de MongoDB:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/sample_airbnb?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANTE**: La URI debe incluir el nombre de la base de datos `sample_airbnb` antes de los query params.

### 2. Instalar Dependencias

```bash
npm install
```

## 🚀 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

### Modo Producción

```bash
npm run build
node dist/index.js
```

## 📡 Endpoints API

### Health Check

```
GET /health
```

Verifica el estado del servidor y la conexión a MongoDB.

**Respuesta:**
```json
{
  "statusCode": 200,
  "message": "API is running",
  "data": {
    "uptime": 123.45,
    "timestamp": "2025-09-29T19:30:00.000Z",
    "database": {
      "connected": true,
      "state": "connected"
    }
  }
}
```

---

### Listar Todos los Listings

```
GET /api/v1/listings?page=1&limit=10
```

**Query Parameters:**
- `page` (opcional): Número de página, default: 1
- `limit` (opcional): Items por página, default: 10, máximo: 100

**Respuesta:**
```json
{
  "statusCode": 200,
  "message": "Listings retrieved successfully",
  "data": {
    "listings": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 556,
      "totalItems": 5555,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

---

### Obtener Listing por ID

```
GET /api/v1/listings/:id
```

**Path Parameters:**
- `id`: ID del listing (String)

**Respuesta:**
```json
{
  "statusCode": 200,
  "message": "Listing retrieved successfully",
  "data": {
    "_id": "10006546",
    "name": "Ribeira Charming Duplex",
    "price": { "$numberDecimal": "80.00" },
    "bedrooms": 3,
    "beds": 5,
    ...
  }
}
```

---

### Buscar Listings con Filtros

```
GET /api/v1/listings/search?property_type=House&bedrooms=3&market=Porto
```

**Query Parameters:**
- `property_type` (opcional): Tipo de propiedad (House, Apartment, etc.)
- `bedrooms` (opcional): Número de habitaciones
- `beds` (opcional): Número de camas
- `min_price` (opcional): Precio mínimo
- `max_price` (opcional): Precio máximo
- `market` (opcional): Ciudad/mercado
- `page` (opcional): Número de página, default: 1
- `limit` (opcional): Items por página, default: 10, máximo: 100

**Respuesta:**
```json
{
  "statusCode": 200,
  "message": "Search completed successfully",
  "data": {
    "listings": [...],
    "filters": {
      "property_type": "House",
      "bedrooms": 3,
      "beds": null,
      "min_price": null,
      "max_price": null,
      "market": "Porto"
    },
    "pagination": {
      "currentPage": 1,
      "totalPages": 12,
      "totalItems": 115,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **Rate Limiting**: 100 requests por IP cada 15 minutos en rutas `/api/*`
- **CORS**: Configurado para frontend en `http://localhost:5173`
- **Variables de entorno**: Credenciales nunca hardcodeadas

## 📊 Modelo de Datos

La colección `listingsAndReviews` contiene **5,555 documentos** con la siguiente estructura:

### Campos Principales

- `_id`: String (no ObjectId)
- `name`: String - Nombre del listing
- `summary`: String - Resumen breve
- `description`: String - Descripción completa
- `property_type`: String - Tipo de propiedad
- `room_type`: String - Tipo de habitación
- `price`: Mixed (`$numberDecimal`) - Precio por noche
- `bedrooms`: Number - Número de habitaciones
- `beds`: Number - Número de camas
- `accommodates`: Number - Capacidad de personas
- `bathrooms`: Mixed (`$numberDecimal`) - Número de baños
- `images`: Object con `picture_url`, `thumbnail_url`, etc.
- `address`: Object con `market`, `country`, `location` (Point con coordinates)
- `host`: Object con información del anfitrión
- `reviews`: Array de objetos con reseñas
- `amenities`: Array de Strings
- `review_scores`: Object con puntuaciones
- `number_of_reviews`: Number

### Índices Configurados (12 total)

- `_id_`
- `address.location_2dsphere` (geoespacial)
- `property_type_1_room_type_1_beds_1` (compuesto)
- `name_1`, `property_type_1`, `room_type_1`, `bedrooms_1`, `beds_1`, `price_1`
- `address.location.coordinates_2dsphere` (geoespacial)
- `address.country_1_address.market_1` (compuesto)
- `price_1_bedrooms_1` (compuesto)

## 🛠️ Scripts Disponibles

```bash
npm run dev       # Ejecuta en modo desarrollo con ts-node
npm run build     # Compila TypeScript a JavaScript
npm test          # Ejecuta tests (por implementar)
```

## 📝 Formato de Respuestas

Todas las respuestas siguen el formato estándar:

### Éxito
```json
{
  "statusCode": 200,
  "message": "Descripción del resultado",
  "data": { ... }
}
```

### Error
```json
{
  "statusCode": 404,
  "message": "Descripción del error",
  "error": {
    "code": "NOT_FOUND",
    "message": "Detalles específicos del error"
  }
}
```

## 🐛 Troubleshooting

### Error: MONGODB_URI is not defined

Verifica que el archivo `.env` existe y contiene la variable `MONGODB_URI`.

### Error: Connection timeout

- Verifica que tu IP está en la whitelist de MongoDB Atlas
- Confirma que las credenciales son correctas
- Revisa la conectividad de red

### Error: Collection not found

Asegúrate de que la URI incluye `/sample_airbnb` antes de los query params.

## 📄 Licencia

ISC
