# Módulo de Estadísticas - Frontend

Dashboard completo de estadísticas con Chart.js y React, diseñado con una paleta de colores verdes y estilo minimalista.

## 📁 Estructura de Archivos Creados

### Tipos TypeScript
- **`src/types/stats.ts`** - Interfaces para todos los tipos de datos de estadísticas

### Servicios
- **`src/services/statsService.ts`** - Cliente API para consumir los 6 endpoints de estadísticas

### Utilidades
- **`src/utils/chartConfig.ts`** - Configuración global de Chart.js, paleta de colores verdes

### Componentes de Gráficas
- **`src/components/stats/KPICards.tsx`** - Tarjetas de KPIs (4 métricas principales)
- **`src/components/stats/PriceDistributionChart.tsx`** - Gráfica de barras para distribución de precios
- **`src/components/stats/PropertyTypesChart.tsx`** - Gráfica de dona para tipos de propiedad
- **`src/components/stats/AccommodatesChart.tsx`** - Gráfica de líneas para capacidad de huéspedes
- **`src/components/stats/AvailabilityChart.tsx`** - Gráfica de radar para disponibilidad
- **`src/components/stats/ReviewScoresChart.tsx`** - Gráfica de barras para puntuaciones
- **`src/components/stats/StatsFiltersPanel.tsx`** - Panel de filtros colapsable

### Páginas
- **`src/pages/Statistics.tsx`** - Página principal del dashboard de estadísticas

### Archivos Modificados
- **`src/components/Header.tsx`** - Agregado navbar con navegación a Estadísticas
- **`src/index.tsx`** - Configurado React Router con rutas

## 🎨 Características de Diseño

### Paleta de Colores Verde
```typescript
{
  primary: '#5a8a8a',
  secondary: '#6fa3a3',
  tertiary: '#84bcbc',
  light: '#99d5d5',
  lighter: '#aeeaea',
  dark: '#3d5a5a',
  darker: '#2a4040',
}
```

### Estilo Visual
- **Minimalista y limpio** - Mucho espacio en blanco, jerarquía clara
- **Glass morphism** - Header con efecto de vidrio esmerilado
- **Sombras suaves** - Box shadows sutiles en tarjetas
- **Transiciones suaves** - Animaciones de 0.2s en hover
- **Responsive** - Grid adaptable para desktop, tablet y mobile

## 📊 Componentes del Dashboard

### 1. KPI Cards (4 tarjetas)
- Total de Propiedades 🏠
- Precio Promedio 💰
- Precio Mediano 📊
- Reviews Promedio ⭐

### 2. Gráficas Principales

#### Distribución de Precios (Barras)
- Muestra buckets de precio predefinidos
- Tooltip con conteo de propiedades
- Colores en tonos verdes

#### Tipos de Propiedad (Dona)
- Top 6 categorías + "Otros"
- Muestra porcentaje y conteo
- Leyenda a la derecha
- Cutout del 65% para efecto dona

#### Capacidad de Huéspedes (Línea)
- Distribución por número de personas
- Línea suave con relleno
- Puntos destacados

#### Disponibilidad (Radar)
- 4 métricas: 30, 60, 90, 365 días
- Visualización radial
- Área rellena en verde

#### Puntuaciones de Reviews (Barras)
- Distribución por rangos de puntuación
- Muestra promedio en subtítulo
- Histograma de calificaciones

## 🎛️ Panel de Filtros

### Filtros Disponibles
- **País** - Select con todos los países
- **Mercado** - Select con mercados/ciudades
- **Tipo de Propiedad** - Select con tipos principales
- **Precio Mínimo/Máximo** - Inputs numéricos
- **Capacidad Mínima/Máxima** - Inputs numéricos
- **Puntuación Mínima** - Input numérico (0-100)

### Características
- **Colapsable** - Se puede ocultar/mostrar
- **Contador de filtros activos** - Badge con número de filtros
- **Botones de acción** - "Aplicar Filtros" y "Limpiar"
- **Estado deshabilitado** - Durante carga de datos

## 🔄 Flujo de Datos

```
Usuario aplica filtros
    ↓
StatsFiltersPanel actualiza estado
    ↓
Statistics.tsx recibe nuevos filtros
    ↓
useEffect detecta cambio en filtros
    ↓
loadStatistics() hace 6 llamadas paralelas
    ↓
Promise.all espera todas las respuestas
    ↓
Actualiza estados individuales
    ↓
Componentes de gráficas se re-renderizan
```

## 🚀 Navegación

### Navbar
- **🏠 Propiedades** - Ruta `/` (página principal)
- **📊 Estadísticas** - Ruta `/statistics` (dashboard)

### Características del Navbar
- Indicador visual de página activa
- Efecto hover con cambio de opacidad
- Fondo semi-transparente con blur
- Responsive en mobile

## 📱 Responsive Design

### Desktop (>992px)
- Grid de 2-3 columnas
- Gráficas lado a lado
- Panel de filtros expandido

### Tablet (768px - 991px)
- Grid de 2 columnas
- Gráficas apiladas en pares

### Mobile (<768px)
- Grid de 1 columna
- Todas las gráficas apiladas
- Panel de filtros colapsado por defecto
- KPI cards en 2 columnas

## 🎯 Estados de UI

### Loading
- Skeleton loaders en KPI cards
- Spinners en gráficas
- Botones deshabilitados

### Error
- Alert de Bootstrap con mensaje
- Sugerencia de verificar backend
- Color rojo (#dc3545)

### Empty State
- Mensaje "Sin datos disponibles"
- Fondo gris claro
- Ícono o texto centrado

## 🔧 Configuración de Chart.js

### Opciones Globales
- **Responsive**: true
- **MaintainAspectRatio**: false (altura fija de 300px)
- **Animación**: 750ms con easing 'easeInOutQuart'
- **Tooltips**: Fondo oscuro, padding 12px, bordes redondeados
- **Leyendas**: Posición top, puntos circulares

### Accesibilidad
- Contraste AA cumplido
- Tamaños de fuente legibles (11-13px)
- Estados focus/hover visibles
- Descripciones para screen readers

## 📦 Dependencias Utilizadas

```json
{
  "chart.js": "^4.5.0",
  "react-chartjs-2": "^5.3.0",
  "react-router-dom": "^7.9.3",
  "react-bootstrap": "^2.10.10"
}
```

## 🧪 Testing

### Verificación Manual
1. Navegar a http://localhost:5173/statistics
2. Verificar que todas las gráficas se cargan
3. Probar filtros individuales y combinados
4. Verificar responsive en diferentes tamaños
5. Probar navegación entre páginas

### Casos de Prueba
- ✅ Carga inicial sin filtros
- ✅ Aplicar filtro de país
- ✅ Aplicar múltiples filtros
- ✅ Limpiar filtros
- ✅ Navegación entre páginas
- ✅ Responsive en mobile
- ✅ Estados de loading y error

## 🎨 Mejores Prácticas Implementadas

### React
- Hooks (useState, useEffect, useCallback)
- Componentes funcionales
- Props tipadas con TypeScript
- Memoización con useCallback

### TypeScript
- Interfaces para todos los tipos
- Tipos estrictos en props
- No uso de `any` (excepto en callbacks de Chart.js)

### Performance
- Promise.all para llamadas paralelas
- Debounce implícito en filtros
- Lazy loading de gráficas
- Optimización de re-renders

### UX
- Feedback visual inmediato
- Estados de carga claros
- Mensajes de error descriptivos
- Transiciones suaves

## 🔮 Posibles Mejoras Futuras

1. **Caché de datos** - LocalStorage o React Query
2. **Exportar datos** - CSV, PDF, PNG de gráficas
3. **Comparación temporal** - Filtros de fecha
4. **Gráficas adicionales** - Mapa de calor, treemap
5. **Temas** - Modo oscuro
6. **Compartir** - URL con filtros en query params
7. **Favoritos** - Guardar combinaciones de filtros
8. **Notificaciones** - Alertas de cambios significativos

## 📝 Notas de Implementación

- Todos los componentes son funcionales y usan hooks
- TypeScript estricto en todos los archivos
- Estilos inline para máxima portabilidad
- Sin dependencias de CSS externas (excepto Bootstrap)
- Paleta de colores consistente en toda la app
- Animaciones respetan `prefers-reduced-motion`
