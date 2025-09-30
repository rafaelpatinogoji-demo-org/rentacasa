---
trigger: always_on
---

Estructura del proyecto
	•	/app (frontend): React 19.x, TypeScript, React-Bootstrap, Axios.
	•	/api (backend): Node.js 22 LTS, Express, TypeScript, MongoDB + Mongoose (8.x).
	•	Patrón de arquitectura (API): routes/ → controllers/ → models/.
	•	models/: esquemas y validaciones Mongoose.
	•	controllers/: lógica de negocio (CRUD, DTOs).
	•	routes/: mapea endpoints a controladores.
	•	Conexión Mongo centralizada con retry y healthcheck.

Lenguaje, paquetes y versiones
	•	TypeScript SIEMPRE (frontend y backend).
	•	Gestor: npm.
	•	Node requerido: v22.
	•	Si la máquina no tiene Node, instalar Node 22 y verificar con node -v.

Testing y calidad
	•	Testing: Jest (unitario e integración).
	•	Coverage mínimo: 80%.
	•	Lint/format: ESLint + Prettier (reglas estrictas TS).

Convenciones API
	•	REST JSON, prefijo /api/v1.
	•	Respuestas: siempre incluir statusCode y message en el JSON.
	•	Ejemplo:
{ "statusCode": 200, "message": "Operación exitosa", "data": {...} }

	•	Errores: objetos { error: { code, message, details? } }.
	•	Validación: DTO en controller + esquema en model.
	•	Seguridad: solo .env para secretos y CORS restringido.
	•	Sin JWT ni auth (no se requiere para este workshop).

Scripts npm (referencia)
	•	npm run dev – corre app y api en modo desarrollo.
	•	npm run build – compila TS (app y api).
	•	npm test – ejecuta Jest con cobertura.
	•	npm run lint / npm run typecheck – calidad de código.

Frontend (/app)
	•	React 19.x con TS + componentes de React-Bootstrap.
	•	HTTP: Axios con manejo simple de errores.
	•	Estado: local o librería ligera si es necesario.
	•	UI: accesible y con i18n básico.

Backend (/api)
	•	Express con middlewares básicos: logging, cors, helmet, rate-limit.
	•	Mongoose para ODM (índices, validaciones, timestamps).
	•	Servicios separados si la lógica crece.
	•	Jobs/cron opcionales, no bloqueantes.

⸻

Resumen operativo

Usamos React 19 + TS en /app y Node 22 + Express + TS + Mongo/Mongoose en /api. Testing con Jest, npm como gestor. La API devuelve siempre un JSON con statusCode y message. Sin JWT ni auth, solo lo necesario para construir rápido durante el workshop.