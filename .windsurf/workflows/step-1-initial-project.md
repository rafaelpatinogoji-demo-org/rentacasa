---
description: Create basic project structure
auto_execution_mode: 3
---

Step 1 — App Initialization with Create React App and API
Create two folders in the root folder: /app (frontend React with TypeScript using Create React App) and /api (backend Node.js + Express with TypeScript)
In /app:
Initialize project with Create React App by running this literal command in the root: npx create-react-app app --template typescript
Then cd app and npm install
Install additional dependencies: npm i react-bootstrap bootstrap axios
Edit src/index.tsx to import Bootstrap at the beginning of the file after the React imports: import 'bootstrap/dist/css/bootstrap.min.css'
Create or modify src/App.tsx with a centered screen using Bootstrap classes, general gray background, a React-Bootstrap Card with white background. The Card should initially only have a button without any text. When the button is clicked, call via Axios the backend GET http://localhost:3000/api/v1/hello and display in the Card the response from the backend message with a ✅ emoji next to it indicating success.
Scripts already come with CRA: npm start starts development server on port 3000 by default and npm run build builds for production.
IMPORTANT: CRA uses port 3000 by default for the frontend so you must change the backend port to 5000 or change the frontend port. To change the frontend port create a .env file in /app with the line PORT=5173
In /api:
Initialize project by running in /api these literal commands: npm init -y then npm i express cors and npm i -D typescript ts-node @types/node @types/express
Create tsconfig.json with target ES2020, module CommonJS, strict true, outDir dist.
Create src/index.ts that imports express and cors, configures cors with origin http://localhost:5173, defines GET route /api/v1/hello that returns status 200 and JSON with statusCode 200 and message "Hello Windsurf", and starts on port 3000.
Scripts in package.json: dev with ts-node src/index.ts and build with tsc && node dist/index.js
Dev integration: Backend at http://localhost:3000 and Frontend at http://localhost:5173 using the .env file with PORT=5173. In the frontend Axios should call http://localhost:3000/api/v1/hello when pressing the button.
Expected result: The frontend starts with a white Card centered on a gray background that only shows a button. When the button is pressed, an HTTP request is made to the backend and the Card displays the text "Hello Windsurf ✅" that comes from the backend with the emoji indicating success.

When you complete this workflow, run the project so the user can see the result
