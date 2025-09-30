---
description: Verificar acesso ao MongoDB usando MCP
auto_execution_mode: 3
---

Objetivo:
Usar o Servidor MCP do MongoDB para verificar conectividade e permissões contra o cluster, a base de dados "sample_airbnb" e a coleção "listingsAndReviews". Não modifique dados.

Instruções para o Cascade:

Conexão

Use o Servidor MCP do MongoDB que já está configurado pelo usuário para conectar ao cluster.
Verifique se o Servidor MCP responde corretamente.


Verificações do Cluster

Liste as bases de dados acessíveis usando o MCP.
Confirme se "sample_airbnb" existe e é acessível.
Se não aparecer, reporte "BD não encontrado ou sem permissão" com causa raiz.


Verificações da Base de Dados e Coleção

Dentro de "sample_airbnb", liste as coleções usando o MCP.
Confirme se "listingsAndReviews" existe. Se não existir, tente localizar pelo nome equivalente "listings and reviews".
Uma vez confirmada a coleção, execute em paralelo usando ferramentas do MCP:

Contagem de documentos com count.
Um documento de exemplo com findOne sem filtros.
Índices definidos com listIndexes.


Use ferramentas do MCP em paralelo sempre que possível para ser mais eficiente.


Formato de Saída Requerido

Primeiro, mostre um resumo executivo com emojis nesta ordem exata:

Servidor MCP MongoDB conectado: ✅/❌
Acesso à base de dados "sample_airbnb": ✅/❌
Acesso à coleção "listingsAndReviews": ✅/❌
Leitura findOne permitida: ✅/❌
Contagem de documentos: número exato ou N/D
Índices configurados: número total e lista de nomes ou N/D


Depois, forneça uma seção "Detalhes da Verificação" que inclua:

Estatísticas do cluster: número de bases de dados acessíveis.
Estatísticas da base de dados: tamanho em MB se disponível.
Breve descrição do documento de exemplo obtido.
Lista detalhada de índices com seus nomes e campos.


Finalize com um "Estado Final" que resume se tudo está operacional ou o que está faltando.
Em caso de falha em qualquer passo, retorne a causa raiz específica e ação sugerida como "URI inválida", "IP não autorizado na whitelist", "função sem permissão de leitura", ou "coleção não existe".


Regras Críticas

NÃO modifique dados ou configurações sob nenhuma circunstância.
A operação deve ser idempotente: se você repetir o passo, o estado deve ser exatamente o mesmo.
NÃO exponha credenciais, URIs de conexão ou segredos na saída.
Use formato profissional, claro e scaneável com seções bem definidas.
Se encontrar erros, pare a execução imediatamente e reporte o problema com contexto específico.
