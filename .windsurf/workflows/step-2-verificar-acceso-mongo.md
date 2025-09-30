---
description: Verificar acceso a MONGODB usando MCP
auto_execution_mode: 3
---

Objetivo:
Usar el MCP Server de MongoDB para comprobar conectividad y permisos contra el cluster, la base de datos "sample_airbnb" y la colección "listingsAndReviews". No modificar datos.
Instrucciones para Cascade:

Conexión

Usa el MCP Server de MongoDB que ya está configurado por el usuario para conectarte al cluster.
Verifica que el MCP Server responde correctamente.


Verificaciones del cluster

Lista las bases de datos accesibles usando MCP.
Confirma que "sample_airbnb" existe y es accesible.
Si no aparece reporta "DB no encontrada o sin permiso" con causa raíz.


Verificaciones de la base de datos y colección

Dentro de "sample_airbnb" lista las colecciones usando MCP.
Confirma que existe "listingsAndReviews". Si no intenta localizar por nombre equivalente "listings and reviews".
Una vez confirmada la colección ejecuta en paralelo usando herramientas MCP:

Recuento de documentos con count.
Un documento de muestra con findOne sin filtros.
Índices definidos con listIndexes.


Usa herramientas MCP en paralelo siempre que sea posible para ser más eficiente.


Formato de salida requerido

Primero muestra un resumen ejecutivo con emojis en este orden exacto:

MCP Server MongoDB conectado: ✅/❌
Acceso a base "sample_airbnb": ✅/❌
Acceso a colección "listingsAndReviews": ✅/❌
Lectura con findOne permitida: ✅/❌
Recuento de documentos: número exacto o N/D
Índices configurados: número total y lista de nombres o N/D


Luego proporciona una sección de "Detalles de la Verificación" que incluya:

Estadísticas del cluster: número de bases de datos accesibles.
Estadísticas de la base de datos: tamaño en MB si está disponible.
Descripción breve del documento de muestra obtenido.
Lista detallada de índices con sus nombres y campos.


Finaliza con un "Estado Final" que resuma si todo está operativo o qué falta.
En caso de fallo en cualquier paso devuelve causa raíz específica y acción sugerida como "URI inválida", "IP no autorizada en whitelist", "rol sin permiso de lectura", o "colección no existe".


Reglas críticas

NO modifiques datos ni configuraciones bajo ninguna circunstancia.
Operación debe ser idempotente: si repites el paso el estado debe ser exactamente el mismo.
NO expongas credenciales, URIs de conexión, ni secretos en la salida.
Usa formato profesional, claro y escaneable con secciones bien definidas.
Si encuentras errores detén la ejecución inmediatamente y reporta el problema con contexto específico.