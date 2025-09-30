# 🏡 Windsurf Workshop - RentaCasa

Bienvenido al **Windsurf Workshop**! En este taller aprenderás a construir una aplicación completa de listado de propiedades tipo Airbnb usando **Windsurf Cascade** y siguiendo workflows paso a paso.

## 🎯 ¿Qué vas a construir?

Una aplicación web full-stack moderna que incluye:

- 🎨 **Frontend React** con TypeScript, React Bootstrap y Chart.js
- ⚡ **Backend Node.js** con Express, TypeScript y MongoDB
- 📊 **Dashboard de Estadísticas** con gráficas interactivas
- 🔍 **Sistema de Filtros** avanzado
- 📱 **Diseño Responsive** para todos los dispositivos

## 🚀 Tecnologías

### Frontend (`/app`)
- React 19.x con TypeScript
- React Bootstrap para UI
- Chart.js para visualizaciones
- Axios para peticiones HTTP
- React Router para navegación

### Backend (`/api`)
- Node.js 22 LTS
- Express con TypeScript
- MongoDB + Mongoose 8.x
- Arquitectura: Routes → Controllers → Services → Models

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener:

- ✅ **Windsurf IDE** instalado
- ✅ **Node.js 22.x** (se instalará en el Step 0)
- ✅ **MongoDB Atlas** con la base de datos `sample_airbnb`
- ✅ **MCP Server de MongoDB** configurado en Windsurf

## 🎓 Cómo usar este Workshop

Este workshop está diseñado para ser completado usando **Windsurf Cascade** y los workflows incluidos en la carpeta `.windsurf/workflows/`.

### Paso a Paso

Sigue los workflows en orden usando el comando `/` en Cascade:

#### **Step 0: Verificación de Ambiente** 
```
/step-0-instalar-todo
```
Verifica e instala Node.js 22.x usando NVM.

#### **Step 1: Proyecto Inicial**
```
/step-1-proyecto-inicial
```
Crea la estructura básica con React (frontend) y Express (backend). Implementa el primer endpoint "Hola Windsurf".

#### **Step 2: Verificar Acceso a MongoDB**
```
/step-2-verificar-acceso-mongo
```
Usa el MCP Server de MongoDB para verificar conectividad con la base de datos `sample_airbnb`.

#### **Step 3: Crear Rutas Iniciales**
```
/step-3-crear-rutas-iniciales
```
Implementa el backend completo:
- Modelo de Listing con Mongoose
- Controladores con validación
- Rutas GET (listado y detalle)
- Endpoint de búsqueda con filtros

#### **Step 4: Crear UI para Listings**
```
/step-4-crear-ui-get-listings
```
Construye el frontend para mostrar propiedades:
- Listado con paginación
- Tarjetas de propiedades
- Integración con la API

#### **Step 5: Mejoras de UI**
```
/step-5-mejoras-de-ui
```
Mejora el diseño visual:
- Estilos CSS personalizados
- Header con glass morphism
- Diseño responsive
- Paleta de colores verde

#### **Step 6: Modal de Detalle**
```
/step-6-crear-ui-modal-detalle
```
Implementa un modal para ver detalles completos de cada propiedad.

#### **Step 7: Sistema de Filtros**
```
/step-7-plan-filters
```
Agrega filtros avanzados:
- Por tipo de propiedad
- Por rango de precio
- Por número de habitaciones
- Por ubicación

#### **Step 8: API de Estadísticas**
```
/step-8-statistics-api
```
Crea el módulo de estadísticas en el backend:
- 7 endpoints de estadísticas
- Agregaciones de MongoDB
- Filtros consistentes
- Conversión de Decimal128

#### **Step 9: Dashboard de Estadísticas**
```
/step-9-crear-statistics-ui
```
Construye el dashboard con Chart.js:
- 4 KPI Cards
- 6 gráficas interactivas
- Panel de filtros
- Diseño minimalista verde

## 🎨 Diseños de Referencia

En la carpeta `/ui` encontrarás:
- `design.png` - Diseño del listado de propiedades
- `modal.png` - Diseño del modal de detalle

## 🏗️ Arquitectura del Proyecto

```
workshop_windsurf/
├── .windsurf/           # Workflows y reglas de Windsurf
│   ├── workflows/       # 10 workflows paso a paso
│   └── rules/          # Reglas de idioma y tech stack
├── api/                # Backend Node.js + Express
│   ├── src/
│   │   ├── config/     # Configuración de DB
│   │   ├── models/     # Modelos de Mongoose
│   │   ├── controllers/# Lógica de negocio
│   │   ├── routes/     # Definición de rutas
│   │   ├── services/   # Servicios (estadísticas)
│   │   └── types/      # Tipos TypeScript
│   └── package.json
├── app/                # Frontend React
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   ├── pages/      # Páginas (Statistics)
│   │   ├── services/   # Clientes API
│   │   ├── types/      # Tipos TypeScript
│   │   └── utils/      # Utilidades (Chart.js config)
│   └── package.json
└── ui/                 # Diseños de referencia
```

## 🚦 Cómo Empezar

1. **Clona este repositorio**
   ```bash
   git clone https://github.com/rafaelpatinogoji-demo-org/rentacasa.git
   cd rentacasa
   ```

2. **Abre el proyecto en Windsurf**
   ```bash
   windsurf .
   ```

3. **Abre Cascade** (Cmd/Ctrl + L)

4. **Ejecuta el primer workflow**
   ```
   /step-0-instalar-todo
   ```

5. **Sigue los workflows en orden** hasta completar el proyecto

## 📚 Recursos Adicionales

### Documentación de Referencia
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Mongoose](https://mongoosejs.com)
- [Chart.js Documentation](https://www.chartjs.org)
- [React Bootstrap](https://react-bootstrap.github.io)

### Windsurf
- [Windsurf Documentation](https://docs.codeium.com/windsurf)
- [Cascade AI Agent](https://docs.codeium.com/windsurf/cascade)
- [Workflows Guide](https://docs.codeium.com/windsurf/workflows)

## 🎯 Objetivos de Aprendizaje

Al completar este workshop, habrás aprendido a:

- ✅ Usar **Windsurf Cascade** para desarrollo asistido por IA
- ✅ Crear workflows reutilizables
- ✅ Construir APIs REST con Express y TypeScript
- ✅ Trabajar con MongoDB y agregaciones
- ✅ Desarrollar interfaces con React y TypeScript
- ✅ Implementar visualizaciones con Chart.js
- ✅ Aplicar arquitectura limpia (Routes → Controllers → Services)
- ✅ Manejar estado y navegación en React
- ✅ Crear diseños responsive con Bootstrap

## 🌟 Resultado Final

Al completar todos los workflows, tendrás una aplicación completa con:

- 📊 Dashboard de estadísticas con 6 gráficas interactivas
- 🏠 Listado de propiedades con filtros avanzados
- 🔍 Búsqueda y paginación
- 📱 Diseño responsive y moderno
- ⚡ API REST completa con 10+ endpoints
- 🎨 UI profesional con paleta verde

## 🔗 Ver Versión Completada

Si quieres ver el código final completo, cambia a la rama `finished-version`:

```bash
git checkout finished-version
```

## 💡 Tips para el Workshop

1. **Lee cada workflow completo** antes de ejecutarlo
2. **Usa Cascade** para todas las implementaciones
3. **Verifica cada paso** antes de continuar al siguiente
4. **Prueba la aplicación** después de cada workflow
5. **Consulta la rama finished-version** si te atoras

## 🤝 Contribuciones

Este es un proyecto educativo. Si encuentras mejoras o errores:

1. Crea un issue describiendo el problema
2. O envía un pull request con la solución

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Créditos

Workshop creado para demostrar las capacidades de **Windsurf IDE** y **Cascade AI Agent**.

---

**¡Disfruta construyendo con Windsurf! 🚀**

¿Preguntas? Abre un issue en el repositorio.
