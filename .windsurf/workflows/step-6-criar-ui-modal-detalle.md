---
description: Criar um modal de detalhe
auto_execution_mode: 1
---

Passo 6 — Modal de Propriedade (MUITO VISUALMENTE ATRAENTE)

VEJA A REFERÊNCIA "ui/modal.png"

Objetivo:
Quando o usuário clicar em uma listagem de propriedade, abrir um modal que pareça premium, minimalista e MUITO VISUALMENTE ATRAENTE. Deve transmitir atenção aos detalhes, clareza e uma experiência moderna.

O que deve acontecer
	•	Ao clicar em um card de propriedade, um modal centralizado se abre.
	•	O fundo do site aparece ligeiramente escuro e borrado (blur) para dar proeminência ao modal.
	•	O modal tem cantos muito arredondados, uma sensação de leveza e ordem.


Design do Modal (Estrutura)
	•	Duas partes claramente diferenciadas:
	•	Esquerda: uma coluna com a imagem principal do estabelecimento, que preenche a altura visível do modal e tem cantos arredondados de acordo com o estilo geral.
	•	Direita: uma coluna com os detalhes completos da propriedade (nome, localização, tipo, preço, comodidades, resumo/descrição, capacidade, regras, link externo, etc.). Apresente as informações com hierarquia visual clara e espaçamento generoso.


Estilo Visual (Aparência e Sensação)
	•	MUITO VISUALMENTE ATRAENTE: limpo, moderno, elegante, com tipografia legível, espaçamento em múltiplos de 8/12/16, e sombra sutil para profundidade.
	•	Paleta: base branca e acentos azul-esverdeados elegantes; badges em cores pastel suaves (rosa, menta, amarelo claro, lavanda, pêssego). Evite azuis brilhantes.
	•	Detalhes que elevam a experiência:
	•	Micro-interações suaves ao abrir/fechar.
	•	Texto de apoio (ex.: "/noite", "quartos") em cinza médio para não competir com o conteúdo principal.
	•	Botão ou link "Ver mais" para expandir descrição longa.


Animação
	•	Abertura suave e agradável (fade + leve translação/escala) que comunica qualidade.
	•	Fechamento consistente. Considere preferências do usuário que desativam animações.


Acessibilidade e Responsividade
	•	O modal deve funcionar bem em mobile e desktop (duas colunas em desktop; em mobile empilhe imagem no topo e detalhes abaixo).
	•	Texto com contraste adequado e foco correto do teclado.
	•	Botão claro de Fechar.


Dados e Conteúdo (Verifique endpoint + modelo)

Verifique o endpoint correspondente para obter as informações completas da propriedade selecionada (por exemplo, usando um listing_id). Certifique-se de buscar todos os campos necessários antes de abrir o modal para exibi-lo completamente sem flickering.


Modelo de dados de referência (campos úteis para exibir):
	•	Identificação e links: _id, listing_url
	•	Cabeçalho: name
	•	Resumo / descrição: summary (e description como backup)
	•	Localização: address.street, address.market, address.country
	•	Tipo: property_type, room_type, bed_type
	•	Capacidade: accommodates, bedrooms, beds, bathrooms.$numberDecimal
	•	Preço e extras: price.$numberDecimal, cleaning_fee.$numberDecimal, extra_people.$numberDecimal, guests_included.$numberDecimal
	•	Comodidades: amenities (selecione as mais relevantes para chips/rótulos)
	•	Política/Regras: cancellation_policy, house_rules
	•	Imagem principal: images.picture_url
	•	Host (opcional): host.host_name, host_response_rate, host_is_superhost


Nota: O modal deve priorizar informações essenciais primeiro (nome, imagem, preço, tipo, localização) e depois exibir detalhes adicionais de forma ordenada e agradável.


Apresentação sugerida dentro do modal
	1.	Cabeçalho direito: Nome (destacado) e localização breve.
	2.	Bloco de preço: Preço por noite com rótulo "/noite" em texto secundário.
	3.	Badges: tipo de propriedade e quartos (ex. "3 quartos"), em pastéis suaves.
	4.	Descrição: resumo compacto com opção de expandir.
	5.	Comodidades principais: 6–10 chips bonitos e consistentes.
	6.	Capacidade e regras: dados claros e concisos (ícones opcionais).
	7.	Ação: botão principal (ex., "Reservar") e link externo.


Critérios de Sucesso
	•	O modal parece premium e MUITO VISUALMENTE ATRAENTE desde o primeiro momento.
	•	O fundo fica escurecido e borrado para focar a atenção.
	•	Imagem esquerda e detalhes direita são legíveis com hierarquia e espaçamento.
	•	Dados completos e consistentes com o endpoint consultado para a propriedade selecionada.
	•	Comportamento responsivo impecável (duas colunas em desktop; empilhado em mobile).
