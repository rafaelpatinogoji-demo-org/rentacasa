---
description: Verificación de ambiente de desarrollo
auto_execution_mode: 1
---

Step 0 — Verificación e instalación del entorno de desarrollo
	1.	Verifica si está instalado NVM.
	•	Si no está instalado, instala NVM según el sistema operativo (Linux, Mac o Windows).
	2.	Verifica si está instalado Node.js y que la versión activa es exactamente 22.x.
	•	Si no existe Node, instálalo con NVM usando:
	•	nvm install 22
	•	nvm use 22
	•	Si existe pero es otra versión, cambia a la correcta con:
	•	nvm install 22 (si no está descargada)
	•	nvm use 22
	3.	Verifica que npm está disponible y que corresponde a la versión incluida con Node 22.
	•	Si no está, reinstala Node 22 con NVM para forzar la instalación de npm correcto.
	4.	Al final, muestra un resumen claro:
	•	Qué dependencias están listas.
	•	Cuáles fueron instaladas o actualizadas durante este proceso.
	5.	Si todo quedó correcto, imprime un ✅ indicando que el entorno está listo para continuar con la construcción del proyecto.