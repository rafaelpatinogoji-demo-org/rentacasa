---
trigger: always_on
---

---
trigger: always_on
---

Project Structure
	- /app (frontend): React 19.x, TypeScript, React-Bootstrap, Axios.
	- /api (backend): Node.js 22 LTS, Express, TypeScript, MongoDB + Mongoose (8.x).
	- Architecture pattern (API): routes/ → controllers/ → models/.
	- models/: Mongoose schemas and validations.
	- controllers/: business logic (CRUD, DTOs).
	- routes/: maps endpoints to controllers.
	- Centralized Mongo connection with retry and healthcheck.

Language, Packages and Versions
	- TypeScript ALWAYS (frontend and backend).
	- Manager: npm.
	- Required Node version: v22.
	- If the machine doesn't have Node, install Node 22 and verify with node -v.

Testing and Quality
	- Testing: Jest (unit and integration).
	- Minimum coverage: 80%.
	- Lint/format: ESLint + Prettier (strict TS rules).

API Conventions
	- REST JSON, prefix /api/v1.
	- Responses: always include statusCode and message in the JSON.
	- Example:
{ "statusCode": 200, "message": "Successful operation", "data": {...} }

	- Errors: objects { error: { code, message, details? } }.
	- Validation: DTO in controller + schema in model.
	- Security: only .env for secrets and restricted CORS.
	- No JWT or auth (not required for this workshop).

npm Scripts (reference)
	- npm run dev – runs app and api in development mode.
	- npm run build – compiles TS (app and api).
	- npm test – runs Jest with coverage.
	- npm run lint / npm run typecheck – code quality.

Frontend (/app)
	- React 19.x with TS + React-Bootstrap components.
	- HTTP: Axios with simple error handling.
	- State: local or lightweight library if needed.
	- UI: accessible with basic i18n.

Backend (/api)
	- Express with basic middlewares: logging, cors, helmet, rate-limit.
	- Mongoose for ODM (indexes, validations, timestamps).
	- Separate services if logic grows.
	- Jobs/cron optional, non-blocking.

⸻

Operational Summary

We use React 19 + TS in /app and Node 22 + Express + TS + Mongo/Mongoose in /api. Testing with Jest, npm as manager. The API always returns a JSON with statusCode and message. No JWT or auth, only what's necessary to build quickly during the workshop.