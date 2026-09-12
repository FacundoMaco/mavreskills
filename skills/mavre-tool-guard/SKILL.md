---
name: mavre-tool-guard
description: Gate de política pre-ejecución para tool/skill/MCP calls de un agente de código. Clasifica riesgo, compara intención vs comando, bloquea lo peligroso con alternativa segura, deja pasar lo trivial con audit log local. Usar cuando el usuario quiera revisar acciones del agente antes de que corran, sin subir el repo a la nube ni aprobar cada paso a mano.
---

# mavre-tool-guard

Origen: patrón detectado por Scout (Harden / Agent Integrity Foundation, Product Hunt Sep 9 2026). El dolor real: developers abandonan skills de terceros porque corren `npx` u otros comandos en su repo sin revisión, y "aprobar cada acción a mano" cansa.

## Qué hace

Antes de ejecutar cualquier acción del agente (Shell, MCP, instalación de skill, algo que toque red):

1. **Clasificar riesgo** de la acción propuesta en una de estas categorías:
   - `read-only` — lee archivos o estado, no modifica nada.
   - `write-local` — escribe/modifica archivos dentro del repo.
   - `network` — hace requests salientes (fetch, API, npm install, etc.).
   - `secrets` — toca env vars, tokens, credenciales, `.env`.
   - `destructive` — borra, sobreescribe sin respaldo, fuerza git, o es irreversible.

2. **Comparar intención vs comando**: resumir en una frase qué pidió el usuario y qué comando concreto se va a correr. Si no coinciden, tratar como riesgo alto sin importar la categoría.

3. **Política**: leer `policy.md` en la carpeta del proyecto si existe. Si no existe, aplicar default:
   - `read-only`, `write-local` → permitir en silencio, dejar una línea de audit log.
   - `network` → permitir con un aviso de una línea (qué se conecta y a dónde).
   - `secrets`, `destructive` → bloquear. Explicar el motivo y ofrecer una alternativa segura de una línea (ej. "en vez de `rm -rf`, mover a `_trash/`").

4. **Nunca subir contenido del repo a servicios externos** como parte de este chequeo — el análisis es local.

## Archivo de política opcional

Si el proyecto tiene un `policy.md` en la raíz, se respeta sobre el default. Formato:

```markdown
# Política de mavre-tool-guard
allow: read-only, write-local
warn: network
deny: secrets, destructive
```

## Ejemplo

Usuario pide: "limpiá los logs viejos".
Agente propone: `rm -rf logs/`.
Gate: intención = borrar logs viejos, comando = borra toda la carpeta sin filtro → riesgo `destructive`, comando más amplio que la intención. Bloquea. Alternativa: `find logs/ -mtime +30 -delete`.
