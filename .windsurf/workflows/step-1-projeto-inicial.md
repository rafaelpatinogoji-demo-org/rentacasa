---
description: Criar estrutura básica do projeto
auto_execution_mode: 3
---

Passo 1 — Inicialização do App com Create React App e API
Crie duas pastas na pasta raiz: /app (frontend React com TypeScript usando Create React App) e /api (backend Node.js + Express com TypeScript)
Em /app:
Inicialize o projeto com Create React App executando este comando literal na raiz: npx create-react-app app --template typescript
Depois cd app e npm install
Instale dependências adicionais: npm i react-bootstrap bootstrap axios
Edite src/index.tsx para importar o Bootstrap no início do arquivo após os imports do React: import 'bootstrap/dist/css/bootstrap.min.css'
Crie ou modifique src/App.tsx com uma tela centralizada usando classes do Bootstrap, fundo cinza geral, um Card do React-Bootstrap com fundo branco. O Card deve inicialmente ter apenas um botão sem texto. Quando o botão for clicado, chame via Axios o backend GET http://localhost:3000/api/v1/hello e exiba no Card a resposta da mensagem do backend com um emoji ✅ ao lado indicando sucesso.
Scripts já vêm com CRA: npm start inicia o servidor de desenvolvimento na porta 3000 por padrão e npm run build constrói para produção.
IMPORTANTE: CRA usa a porta 3000 por padrão para o frontend então você deve mudar a porta do backend para 5000 ou mudar a porta do frontend. Para mudar a porta do frontend crie um arquivo .env em /app com a linha PORT=5173
Em /api:
Inicialize o projeto executando em /api estes comandos literais: npm init -y depois npm i express cors e npm i -D typescript ts-node @types/node @types/express
Crie tsconfig.json com target ES2020, module CommonJS, strict true, outDir dist.
Crie src/index.ts que importa express e cors, configura cors com origin http://localhost:5173, define a rota GET /api/v1/hello que retorna status 200 e JSON com statusCode 200 e message "Hello Windsurf", e inicia na porta 3000.
Scripts em package.json: dev com ts-node src/index.ts e build com tsc && node dist/index.js
Integração dev: Backend em http://localhost:3000 e Frontend em http://localhost:5173 usando o arquivo .env com PORT=5173. No frontend Axios deve chamar http://localhost:3000/api/v1/hello ao pressionar o botão.
Resultado esperado: O frontend inicia com um Card branco centralizado em um fundo cinza que mostra apenas um botão. Quando o botão é pressionado, uma requisição HTTP é feita ao backend e o Card exibe o texto "Hello Windsurf ✅" que vem do backend com o emoji indicando sucesso.

Quando você completar este workflow, execute o projeto para que o usuário possa ver o resultado
