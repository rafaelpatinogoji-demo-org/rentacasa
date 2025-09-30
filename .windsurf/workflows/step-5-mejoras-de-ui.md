---
description: Melhorar o UI usando CSS
auto_execution_mode: 1
---

Passo 5 — Redesenhar UI com Estilo Moderno RentaCasa e Cabeçalho Glassmorphism

VOCÊ DEVE VERIFICAR A IMAGEM DE REFERÊNCIA EM ui/design.png

É UMA REFERÊNCIA, você não precisa aderir perfeitamente a ela

Objetivo:
Transformar o frontend atual inspirado no design RentaCasa com um cabeçalho glassmorphism fixo que usa backdrop-filter para um efeito de vidro fosco translúcido. Criar uma aplicação visualmente atraente, profissional e moderna.


Instruções para o Cascade

Componente de Cabeçalho Glassmorphism — CRÍTICO

Crie um componente Header com efeito glassmorphism que deve ser position fixed, top: 0, width: 100%, e z-index: 1000 ou superior para permanecer sempre visível ao rolar.

Propriedades CSS exatas:
	•	background: rgba(61, 90, 90, 0.7) (azul-esverdeado escuro com alpha 0.6–0.8)
	•	backdrop-filter: blur(10px) saturate(180%)
	•	-webkit-backdrop-filter: blur(10px) saturate(180%)
	•	border-bottom: 1px solid rgba(255, 255, 255, 0.1)
	•	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

Conteúdo do cabeçalho:
	•	Emoji 🏡 + texto "RentaCasa" branco bold (24–28px)
	•	Subtítulo "Construído com Windsurf" rgba(255, 255, 255, 0.7), tamanho 14px
	•	Padding vertical 16–20px
	•	Container Bootstrap centralizado com max-width


Ajustar Layout Principal

Adicione padding-top: 100px–120px ao body ou container principal para compensar o cabeçalho fixo.


Esquema de Cores e Marca
	•	Cabeçalho: azul-esverdeado translúcido escuro.
	•	Fundo geral: cinza muito claro #f5f5f5 ou #f8f8f8.
	•	Cards: brancos com sombras sutis, border-radius 12–16px.

Badges: SOMENTE cores pastel (nunca azul brilhante):
	•	Rosa claro #ffc4d6 (texto #b8405e)
	•	Verde menta #c4f0e0 (texto #2d8b6b)
	•	Amarelo claro #fff4c4 (texto #a89b3d)
	•	Lavanda #e4d4f4 (texto #7b5a9e)
	•	Pêssego #ffd4b8 (texto #b86f3d)


Contador de Resultados

Abaixo do cabeçalho: "5555 propriedades encontradas".
Estilo: cinza médio, font-size 14px, margin-bottom 16px.


FilterSidebar
	•	Fundo branco, border-radius 12px, sombra leve, padding 24–32px.
	•	Sticky com top: 120px.
	•	Rótulos em português bold pequenos: Onde?, Tipo, Quartos.
	•	Selects: fundo cinza claro #f8f8f8, border-radius 8px, padding 10px 16px.
	•	Botão de busca: raio pill 99em, fundo azul-esverdeado #5a8a8a, texto branco "🔍 BUSCAR", largura completa. Hover: mais escuro.
	•	Texto "Em breve disponível" abaixo, cinza claro, centralizado.


ListingCard
	•	Cards horizontais:
	•	Imagem esquerda 35–40% largura, border-radius cantos esquerdos, object-fit: cover.
	•	Conteúdo direito com padding 20px.
	•	Título bold preto 18–20px.
	•	Localização cinza médio 14px abaixo.
	•	2 badges pastel suaves (property_type + quartos com "quartos").
	•	Preço bold azul-esverdeado 32–36px, alinhado à direita, "/noite" em cinza 14px.
	•	Cards com fundo branco, sombra sutil, hover com sombra mais forte e translateY(-2px) (transição 200ms).


Grid de Cards — CRÍTICO

⚠️ IMPORTANTE: As propriedades devem SEMPRE ser exibidas em uma grid de 2 colunas no desktop.
	•	Use Row + Col md={6} com gap: 24px.
	•	No mobile colapse para 1 coluna.
	•	Nunca no desktop deve ser exibido em uma única coluna: sempre 2 colunas de cards horizontais.


Tipografia Profissional

Sans-serif moderna.
	•	Títulos dos cards: bold 18–20px
	•	Localizações: 14px
	•	Preços: bold 32–36px
	•	Badges: 13–14px
	•	Rótulos dos filtros: semibold 14px


Responsivo
	•	Cabeçalho fixo no mobile (texto ajustado).
	•	Sidebar colapsa ou move para o topo.
	•	Cards mantêm layout horizontal.
	•	Breakpoints do Bootstrap.


Princípios Modernos de UI com Glassmorphism
	•	backdrop-filter blur + saturate.
	•	Espaçamento múltiplos de 4/8.
	•	Sombras sutis.
	•	Transições 200–300ms.
	•	Hierarquia visual clara.
	•	Contraste acessível.
	•	Cores harmônicas.


Resultado esperado:
Um frontend com um cabeçalho glassmorphism translúcido fixo que permanece visível ao rolar com conteúdo borrado atrás dele. Sidebar limpa, contador visível, e grid de propriedades SEMPRE em 2 colunas no desktop (1 coluna no mobile). Design moderno, coeso, responsivo e profissional.
