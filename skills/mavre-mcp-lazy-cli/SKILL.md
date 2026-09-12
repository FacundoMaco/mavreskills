---
name: mavre-mcp-lazy-cli
description: Evita cargar todos los schemas de un MCP server, OpenAPI o GraphQL en el contexto del agente. Usa un wrapper CLI con descubrimiento perezoso (--list, --search, --help, invoke) en vez de inyectar cientos de tool definitions de una. Usar cuando el usuario conecte un MCP/API grande y el contexto se infle sin necesidad.
---

# mavre-mcp-lazy-cli

Origen: patrón detectado por Scout (mcp2cli, 2391★ en GitHub, threads activos en r/ClaudeCode, r/mcp, r/Python — Sep 2026). El dolor real: MCP servers grandes inyectan cientos de schemas por turno, cuando el agente solo necesita 1-2 tools por tarea.

## Cuándo usar

El usuario apunta a:
- Un MCP server (stdio, HTTP o SSE)
- Un endpoint OpenAPI o GraphQL con muchos endpoints/tools

Y el contexto se llena de schemas que no se usan en la tarea actual.

## Qué hacer

1. **No inyectar el schema completo.** En vez de listar todas las tools/endpoints al agente, exponer solo:
   - `--list` — nombres de tools disponibles, sin schema.
   - `--search <término>` — filtra por palabra clave.
   - `<tool> --help` — trae el schema completo, pero solo de esa tool puntual.
   - `<tool> --json '<args>'` — invoca con los argumentos ya armados.

2. **Si existe una herramienta ya hecha para esto** (ej. `mcp2cli` de knowsuchagency), preferirla antes de escribir un wrapper propio:
   ```bash
   uvx mcp2cli --list
   uvx mcp2cli --search <término>
   uvx mcp2cli <tool> --help
   ```
   O instalar como skill: `npx skills add knowsuchagency/mcp2cli --skill mcp2cli`.

3. **Si no hay wrapper disponible** para ese MCP/API puntual, generar un perfil nombrado con un `SKILL.md` corto: qué expone, cuándo se activa (triggers), y los comandos CLI exactos de list/search/invoke para ese server específico. No pegar el schema completo en el SKILL.md — solo los comandos para pedirlo bajo demanda.

4. **Cuándo NO usar esto**: si el flujo necesita auth en vivo, audit trail del lado del servidor, o streaming — ahí usar el MCP nativo, no el wrapper CLI.

## Resultado esperado

El agente arranca la sesión viendo 3-5 nombres de tools, no cientos de schemas. Solo pide el detalle de la tool que realmente va a usar.
