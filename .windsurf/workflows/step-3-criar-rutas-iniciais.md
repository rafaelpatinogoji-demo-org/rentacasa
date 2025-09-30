---
description: Criar API Backend Inicial
auto_execution_mode: 1
---

Aqui está o Passo 3 melhorado com documentação sobre a estrutura de dados da coleção:

Passo 3 — Criar API Backend com MongoDB para Listagens do Airbnb (Somente Leitura)
Objetivo: Criar endpoints REST em /api para operações GET na coleção listingsAndReviews do MongoDB usando Node 22 Express TypeScript e Mongoose 8.x seguindo o padrão rotas controladores modelos.
Contexto da coleção: A coleção listingsAndReviews contém 5555 documentos de propriedades do Airbnb. Os documentos têm campos com tipos especiais do MongoDB como price que é um objeto com $numberDecimal, bathrooms também com $numberDecimal, e datas que são objetos com $date. As imagens vêm em um objeto images com picture_url. A localização vem em address com campos market para cidade, suburb, country e location com coordenadas. O host vem em um objeto host completo. Reviews é um array de objetos com data e comentários.
Instruções para o Cascade:
Em /api instale as dependências adicionais necessárias para trabalhar com Mongoose dotenv helmet e express-rate-limit mais seus tipos TypeScript.
Crie um arquivo .env em /api com as variáveis MONGODB_URI PORT e NODE_ENV. IMPORTANTE: A URI do Mongo deve incluir o nome da base de dados sample_airbnb no final da URI antes dos parâmetros de consulta. Formato de exemplo: mongodb+srv://usuário:senha@cluster.mongodb.net/sample_airbnb?retryWrites=true. A URI deve vir do .env sempre, nunca hardcoded.
Configure a conexão com o MongoDB com Mongoose em um arquivo de config separado que exporta uma função para conectar. Implemente lógica de retry caso a primeira conexão falhe e adicione um endpoint básico de healthcheck em GET /api/v1/health que verifica o status da conexão com o Mongo.
Crie o modelo Listing do Mongoose em /api/src/models/Listing.ts que usa a coleção listingsAndReviews. IMPORTANTE: Configure o modelo com collection: 'listingsAndReviews' nas opções do schema porque esse é o nome exato no Mongo. Defina o schema com strict false ou tipos Mixed para permitir a estrutura flexível do Mongo. Os campos principais são: _id como String, name, summary, description, property_type, room_type, price como Mixed ou Schema.Types.Decimal128, bedrooms, beds, accommodates como Number, bathrooms como Mixed, images como objeto com picture_url, address como objeto com market suburb country e location com type Point e coordinates, host como objeto com host_id host_name host_picture_url, reviews como Array, amenities como Array de Strings, review_scores como objeto com ratings, number_of_reviews. Use timestamps false porque o Mongo já tem seus próprios campos de data. Defina índices apropriados se necessário.
Implemente três controladores em /api/src/controllers/listingController.ts:
O controlador getAllListings deve lidar com a lógica de paginação aceitando parâmetros de consulta page com default 1 e limit com default 10 e maxLimit de 100. Calcule o skip correto para paginação multiplicando page menos 1 por limit. Use Listing.countDocuments para obter totalItems e calcular totalPages. Use Listing.find com skip e limit. A resposta deve incluir em data um objeto com array listings e paginação com currentPage totalPages totalItems itemsPerPage hasNextPage calculado como currentPage menor que totalPages e hasPreviousPage calculado como currentPage maior que 1.
O controlador getListingById deve obter uma listagem específica por seu ID usando o parâmetro de caminho id. IMPORTANTE: O _id nesta coleção é String não ObjectId então não use ObjectId.isValid. Simplesmente busque com Listing.findById ou Listing.findOne com _id igual ao parâmetro. Se a listagem não existir retorne 404 com mensagem apropriada. Se existir retorne a listagem completa em data.
O controlador searchListings deve permitir buscas com parâmetros de consulta opcionais como property_type bedrooms beds min_price max_price e market para cidade. Também implemente paginação com page e limit. Construa um objeto query dinâmico. Para property_type use correspondência exata. Para bedrooms e beds use correspondência exata ou gte. Para min_price e max_price você precisa acessar o campo price. Para min_price e max_price você precisa acessar o campo price.numberDecimal e convertê-lo ou fazer consultas especiais porque o Mongo salva decimais em formato especial. Para market busque em address.market. A resposta deve incluir listagens encontradas e paginação como getAllListings com hasNextPage e hasPreviousPage.

Todas as respostas devem seguir o formato com statusCode message e data.
Defina as rotas em /api/src/routes/listingRoutes.ts que mapeiam os endpoints REST para os controladores. Use o prefixo /api/v1/listings.
Endpoints para implementar nesta ordem exata:

GET /api/v1/listings/search para buscas com filtros usando parâmetros de consulta
GET /api/v1/listings/:id para obter uma listagem específica por ID
GET /api/v1/listings para obter todas as listagens com paginação usando parâmetros de consulta page e limit

IMPORTANTE: A rota search deve vir ANTES da rota com :id para prevenir que Express interprete search como um ID.
Atualize src/index.ts para importar e usar as rotas configuradas, configurar middlewares de segurança como helmet cors e rate-limit, conectar ao Mongo antes de iniciar o servidor, e lidar com erros globalmente. Use o endpoint healthcheck para verificar a conexão com o Mongo.
Configure CORS para permitir requisições de http://localhost:5173 que é onde o frontend roda.
Todos os endpoints devem retornar JSON com statusCode message e data. Erros devem retornar statusCode message e error com code e details. Implemente validação básica nos controladores para parâmetros de consulta e parâmetros de caminho garantindo que sejam do tipo correto e dentro de faixas válidas.
Resultado esperado: O backend na porta 3000 tem três endpoints funcionais: listar todos com paginação, obter um por ID string, e buscar com filtros opcionais também paginados. Todas as respostas incluem metadados de paginação quando aplicável com os campos corretos hasNextPage e hasPreviousPage. A conexão com o Mongo é estável com lógica de retry e aponta corretamente para a base de dados sample_airbnb e coleção listingsAndReviews. O código está organizado em rotas controladores e modelos seguindo as convenções do projeto. Os 5555 documentos são acessíveis da API retornando a estrutura correta com campos como price.$numberDecimal, images.picture_url, address.market para cidade, e todos os metadados corretamente.
