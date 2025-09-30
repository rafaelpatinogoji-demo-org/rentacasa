---
description: Criar Frontend React para Consumir API de Listagens do Airbnb
auto_execution_mode: 1
---

Passo 4 — Criar Frontend React Inicial para Listagens do Airbnb (Sem Funcionalidade de Filtros)
Objetivo: Criar uma interface em /app usando React TypeScript e React-Bootstrap com layout de duas colunas. Coluna esquerda com filtros sem funcionalidade e coluna direita mostrando listagens em cards com paginação funcional.
Instruções para o Cascade:
Certifique-se de que /app já tem react-bootstrap bootstrap e axios instalados. Se não tiver, instale-os.
Crie interfaces TypeScript em /app/src/types ou inline que correspondam exatamente à estrutura de resposta do backend. IMPORTANTE: O backend retorna data.listings não data.docs e paginação com hasNextPage e hasPreviousPage não hasPrevPage. Defina interfaces para Listing Pagination e ApiResponse para manter type safety.
Crie um serviço em /app/src/services/listingService.ts que encapsule chamadas à API usando Axios. O serviço deve ter um método getAllListings com parâmetros page e limit. A URL base deve ser http://localhost:3000/api/v1. Implemente tratamento básico de erros. O serviço deve retornar a estrutura completa com listings e pagination de response.data.data.
Crie componentes React em /app/src/components:
Um componente ListingCard que recebe uma listagem como prop e a exibe em um Card do React-Bootstrap. Deve mostrar uma imagem se disponível ou um placeholder, nome da listagem, tipo de propriedade property_type, preço por noite formatado do objeto Decimal128 do Mongo, número de quartos, número de camas, e cidade extraída de address.market ou address.suburb ou location de acordo com a estrutura. Faça-o visualmente atraente com bom espaçamento e tipografia clara usando classes do Bootstrap.
Um componente FilterSidebar que renderiza um painel de filtros na coluna esquerda. Deve incluir três seções de filtros SEM funcionalidade ainda, apenas a UI:

Um Form.Select ou lista para selecionar cidade com opções de exemplo
Um Form.Select ou input para número de quartos com opções comuns
Dois Form.Control type number para faixa de preço mínima e máxima

Use componentes Form do React-Bootstrap. Os filtros devem parecer profissionais mas não precisam fazer nada ainda. Adicione um título como "Filtros" no topo da sidebar e um botão "Aplicar Filtros" desabilitado ou sem funcionalidade.
Um componente CustomPagination que recebe currentPage totalPages hasNextPage hasPreviousPage e callbacks para onNext e onPrevious. Use Pagination do React-Bootstrap com Pagination.Prev Pagination.Item e Pagination.Next. Desabilite botões quando não houver página seguinte ou anterior baseado nas flags hasNextPage e hasPreviousPage, não em cálculos manuais.
Atualize /app/src/App.tsx para ser a página principal com layout de duas colunas:
Use Container Row e Col do React-Bootstrap para criar o layout. A coluna esquerda deve ser Col md={3} para o FilterSidebar. A coluna direita deve ser Col md={9} para exibir as listagens.
Mantenha estado para listings pagination loading e error usando useState com tipos TypeScript apropriados.
Ao montar o componente, carregue a primeira página de listagens chamando getAllListings com page 1 e limit 12. Use useEffect com array de dependências vazio.
Na coluna esquerda, renderize o FilterSidebar com fundo branco ou cinza muito claro. Na coluna direita, renderize um título como "Propriedades Disponíveis", depois mostre um Spinner centralizado do React-Bootstrap se estiver carregando, então renderize os ListingCards em uma grid usando Row e Col sm={12} md={6} lg={4} para torná-los responsivos com 3 cards por linha em telas grandes, e finalmente o componente CustomPagination centralizado na parte inferior.
Implemente funções handleNextPage e handlePreviousPage que atualizam o currentPage e chamam o serviço para carregar a nova página de listagens. Adicione scroll automático para o topo ao mudar de páginas usando window.scrollTo.
Use fundo cinza muito claro #f8f9fa para o body e Cards brancos para as listagens. O FilterSidebar deve ter fundo branco ou similar para se destacar.
Implemente tratamento básico de erros que mostra um Alert variant danger do React-Bootstrap se algo falhar com a mensagem de erro.
IMPORTANTE: Certifique-se de que os nomes das propriedades correspondem exatamente ao que o backend retorna: listings não docs, hasNextPage não hasNext, hasPreviousPage não hasPrev.
Resultado esperado: O frontend na porta 5173 exibe um layout de duas colunas. Esquerda com filtros que parecem bons mas não fazem nada ainda, com opções de exemplo para cidade, quartos e preços. Direita com grid responsivo de listagens em cards mostrando dados reais do backend incluindo imagens, nomes, preços, localizações e características. Paginação funcional que permite navegação entre aproximadamente 463 páginas com 12 itens por página. A UI é limpa, responsiva e profissional usando React-Bootstrap. As 5555 listagens são carregadas corretamente do endpoint GET /api/v1/listings com scroll automático ao mudar de páginas.
