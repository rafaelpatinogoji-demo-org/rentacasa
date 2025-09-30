---
description: Verificação do Ambiente de Desenvolvimento
auto_execution_mode: 1
---

Passo 0 — Verificação e Instalação do Ambiente de Desenvolvimento
	1.	Verifique se o NVM está instalado.
	•	Se não estiver instalado, instale o NVM de acordo com o sistema operacional (Linux, Mac ou Windows).
	2.	Verifique se o Node.js está instalado e se a versão ativa é exatamente 22.x.
	•	Se o Node não existir, instale-o com o NVM usando:
	•	nvm install 22
	•	nvm use 22
	•	Se existir mas for outra versão, mude para a versão correta com:
	•	nvm install 22 (se não estiver baixado)
	•	nvm use 22
	3.	Verifique se o npm está disponível e se corresponde à versão incluída com o Node 22.
	•	Se não estiver, reinstale o Node 22 com o NVM para forçar a instalação do npm correto.
	4.	No final, mostre um resumo claro:
	•	Quais dependências estão prontas.
	•	Quais foram instaladas ou atualizadas durante este processo.
	5.	Se tudo estiver correto, imprima um ✅ indicando que o ambiente está pronto para continuar com a construção do projeto.
