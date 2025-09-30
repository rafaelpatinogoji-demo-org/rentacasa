---
description: Crear estructura básica del proyecto
auto_execution_mode: 3
---

Step 1 — Inicialización de App con Create React App y API
Crea en el root folder dos carpetas: /app (frontend React con TypeScript usando Create React App) y /api (backend Node.js + Express con TypeScript)
En /app:
Inicializa proyecto con Create React App ejecutando este comando literal en el root: npx create-react-app app --template typescript
Luego cd app y npm install
Instala dependencias adicionales: npm i react-bootstrap bootstrap axios
Edita src/index.tsx para importar Bootstrap al inicio del archivo después de los imports de React: import 'bootstrap/dist/css/bootstrap.min.css'
Crea o modifica src/App.tsx con pantalla centrada usando clases de Bootstrap, fondo general gris, un Card de React-Bootstrap con fondo blanco. El Card inicialmente solo debe tener un botón sin ningún texto. Cuando se hace click en el botón llama vía Axios al backend GET http://localhost:3000/api/v1/hello y muestra en el Card la respuesta del backend message con un emoji ✅ al lado indicando éxito.
Scripts disponibles ya vienen con CRA: npm start inicia servidor de desarrollo en puerto 3000 por default y npm run build construye para producción.
IMPORTANTE: CRA usa puerto 3000 por default para el frontend así que debes cambiar el puerto del backend a 5000 o cambiar el puerto del frontend. Para cambiar el puerto del frontend crea un archivo .env en /app con la línea PORT=5173
En /api:
Inicializa proyecto ejecutando en /api estos comandos literales: npm init -y luego npm i express cors y npm i -D typescript ts-node @types/node @types/express
Crea tsconfig.json con target ES2020, module CommonJS, strict true, outDir dist.
Crea src/index.ts que importe express y cors, configure cors con origin http://localhost:5173, defina ruta GET /api/v1/hello que devuelva status 200 y JSON con statusCode 200 y message "Hola Windsurf", y arranque en puerto 3000.
Scripts en package.json: dev con ts-node src/index.ts y build con tsc && node dist/index.js
Integración dev: Backend en http://localhost:3000 y Frontend en http://localhost:5173 usando el archivo .env con PORT=5173. En el frontend Axios debe llamar a http://localhost:3000/api/v1/hello al presionar el botón.
Resultado esperado: El frontend arranca con un Card blanco centrado sobre fondo gris que solo muestra un botón. Al presionar el botón se hace la petición HTTP al backend y el Card muestra el texto "Hola Windsurf ✅" que viene del backend con el emoji indicando éxito.

Cuando completes este workflow ejecuta el proyecto para que el usuario pueda ver el resultado