# 🏡 Workshop Windsurf - RentaCasa

Bem-vindo ao **Workshop Windsurf**! Neste workshop você aprenderá a construir uma aplicação completa de listagem de propriedades no estilo Airbnb usando o **Windsurf Cascade** e seguindo workflows passo a passo.

## 🎯 O que você vai construir?

Uma aplicação web full-stack moderna que inclui:

- 🎨 **Frontend React** com TypeScript, React Bootstrap e Chart.js
- ⚡ **Backend Node.js** com Express, TypeScript e MongoDB
- 📊 **Dashboard de Estatísticas** com gráficos interativos
- 🔍 **Sistema de Filtros Avançado**
- 📱 **Design Responsivo** para todos os dispositivos

## 🚀 Tecnologias

### Frontend (`/app`)
- React 19.x com TypeScript
- React Bootstrap para UI
- Chart.js para visualizações
- Axios para requisições HTTP
- React Router para navegação

### Backend (`/api`)
- Node.js 22 LTS
- Express com TypeScript
- MongoDB + Mongoose 8.x
- Arquitetura: Rotas → Controladores → Serviços → Modelos

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ **Windsurf IDE** instalado
- ✅ **Node.js 22.x** (será instalado no Passo 0)
- ✅ **MongoDB Atlas** com a base de dados `sample_airbnb`
- ✅ **Servidor MCP do MongoDB** configurado no Windsurf

## 🎓 Como usar este Workshop

Este workshop foi projetado para ser concluído usando o **Windsurf Cascade** e os workflows incluídos na pasta `.windsurf/workflows/`.

### Passo a Passo

Siga os workflows em ordem usando o comando `/` no Cascade:

#### **Passo 0: Verificação do Ambiente** 
```
/step-0-install-all
```
Verifique e instale o Node.js 22.x usando o NVM.

#### **Passo 1: Projeto Inicial**
```
/step-1-initial-project
```
Crie a estrutura básica com React (frontend) e Express (backend). Implemente o primeiro endpoint "Hello Windsurf".

#### **Passo 2: Verificar Acesso ao MongoDB**
```
/step-2-verify-mongo-access
```
Use o Servidor MCP do MongoDB para verificar a conectividade com a base de dados `sample_airbnb`.

#### **Passo 3: Criar Rotas Iniciais**
```
/step-3-create-initial-routes
```
Implemente o backend completo:
- Modelo de Listagem com Mongoose
- Controladores com validação
- Rotas GET (listagem e detalhe)
- Endpoint de busca com filtros

#### **Passo 4: Criar UI para Listagens**
```
/step-4-create-ui-get-listings
```
Construa o frontend para exibir propriedades:
- Listagem com paginação
- Cards de propriedades
- Integração com a API

#### **Passo 5: Melhorias na UI**
```
/step-5-ui-improvements
```
Melhore o design visual:
- Estilos CSS personalizados
- Cabeçalho com efeito glass morphism
- Design responsivo
- Paleta de cores verde

#### **Passo 6: Modal de Detalhes**
```
/step-6-create-ui-detail-modal
```
Implemente um modal para visualizar detalhes completos de cada propriedade.

#### **Passo 7: Sistema de Filtros**
```
/step-7-plan-filters
```
Adicione filtros avançados:
- Por tipo de propriedade
- Por faixa de preço
- Por número de quartos
- Por localização

#### **Passo 8: API de Estatísticas**
```
/step-8-statistics-api
```
Crie o módulo de estatísticas no backend:
- 7 endpoints de estatísticas
- Agregações do MongoDB
- Filtros consistentes
- Conversão do Decimal128

#### **Passo 9: Dashboard de Estatísticas**
```
/step-9-create-statistics-ui
```
Construa o dashboard com Chart.js:
- 4 Cards de KPI
- 6 gráficos interativos
- Painel de filtros
- Design minimalista verde

## 🎨 Designs de Referência

Na pasta `/ui` você encontrará:
- `design.png` - Design da listagem de propriedades
- `modal.png` - Design do modal de detalhes

## 🏗️ Arquitetura do Projeto

```
workshop_windsurf/
├── .windsurf/           # Workflows e regras do Windsurf
│   ├── workflows/       # 10 workflows passo a passo
│   └── rules/          # Regras de idioma e tecnologias
├── api/                # Backend Node.js + Express
│   ├── src/
│   │   ├── config/     # Configuração do BD
│   │   ├── models/     # Modelos do Mongoose
│   │   ├── controllers/# Lógica de Negócio
│   │   ├── routes/     # Definições de Rotas
│   │   ├── services/   # Serviços (estatísticas)
│   │   └── types/      # Tipos do TypeScript
│   └── package.json
├── app/                # Frontend React
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   ├── pages/      # Páginas (Estatísticas)
│   │   ├── services/   # Clientes da API
│   │   ├── types/      # Tipos do TypeScript
│   │   └── utils/      # Utilitários (configuração do Chart.js)
│   └── package.json
└── ui/                 # Designs de referência
```

## 🚦 Como Começar

1. **Clone este repositório**
   ```bash
   git clone https://github.com/rafaelpatinogoji-demo-org/rentacasa.git
   cd rentacasa
   ```

2. **Abra o projeto no Windsurf**
   ```bash
   windsurf .
   ```

3. **Abra o Cascade** (Cmd/Ctrl + L)

4. **Execute o primeiro workflow**
   ```
   /step-0-install-all
   ```

5. **Siga os workflows em ordem** até completar o projeto

## 📚 Recursos Adicionais

### Documentação de Referência
- [Documentação do React](https://react.dev)
- [Guia do Express.js](https://expressjs.com)
- [MongoDB Mongoose](https://mongoosejs.com)
- [Documentação do Chart.js](https://www.chartjs.org)
- [React Bootstrap](https://react-bootstrap.github.io)

### Windsurf
- [Documentação do Windsurf](https://docs.codeium.com/windsurf)
- [Agente AI Cascade](https://docs.codeium.com/windsurf/cascade)
- [Guia de Workflows](https://docs.codeium.com/windsurf/workflows)

## 🎯 Objetivos de Aprendizagem

Ao completar este workshop, você aprenderá a:

- ✅ Usar o **Windsurf Cascade** para desenvolvimento assistido por IA
- ✅ Criar workflows reutilizáveis
- ✅ Construir APIs REST com Express e TypeScript
- ✅ Trabalhar com MongoDB e agregações
- ✅ Desenvolver interfaces com React e TypeScript
- ✅ Implementar visualizações com Chart.js
- ✅ Aplicar arquitetura limpa (Rotas → Controladores → Serviços)
- ✅ Gerenciar estado e navegação no React
- ✅ Criar designs responsivos com Bootstrap

## 🌟 Resultado Final

Ao completar todos os workflows, você terá uma aplicação completa com:

- 📊 Dashboard de estatísticas com 6 gráficos interativos
- 🏠 Listagem de propriedades com filtros avançados
- 🔍 Busca e paginação
- 📱 Design responsivo e moderno
- ⚡ API REST completa com 10+ endpoints
- 🎨 UI profissional com paleta verde

## 🔗 Ver Versão Completa

Se você quiser ver o código final completo, mude para a branch `finished-version`:

```bash
git checkout finished-version
```

## 💡 Dicas do Workshop

1. **Leia cada workflow completamente** antes de executá-lo
2. **Use o Cascade** para todas as implementações
3. **Verifique cada passo** antes de continuar para o próximo
4. **Teste a aplicação** após cada workflow
5. **Confira a branch finished-version** se você ficar preso

## 🤝 Contribuições

Este é um projeto educacional. Se você encontrar melhorias ou erros:

1. Crie uma issue descrevendo o problema
2. Ou envie um pull request com a solução

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🙏 Créditos

Workshop criado para demonstrar as capacidades do **Windsurf IDE** e do **Agente AI Cascade**.

---

**Aproveite a construção com o Windsurf! 🚀**

Dúvidas? Abra uma issue no repositório.
