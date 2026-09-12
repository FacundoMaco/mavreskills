<div align="center">

# mavreskills

**Skills de Claude Code mantenidas por MavreWorks.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-3-brightgreen)](#catálogo)

</div>

---

Colección de skills para Claude Code, curadas y mantenidas por [MavreWorks](https://mavreworks.com). Cada una resuelve un problema puntual de trabajar con agentes de código: control de riesgo, contexto inflado, integración de herramientas externas.

## Catálogo

| Skill | Qué resuelve |
|---|---|
| [`mavre-tool-guard`](skills/mavre-tool-guard) | Gate de política pre-ejecución: clasifica el riesgo de cada tool/MCP call antes de correrla, bloquea lo peligroso con alternativa segura, deja pasar lo trivial con audit log. |
| [`mavre-mcp-lazy-cli`](skills/mavre-mcp-lazy-cli) | Evita inyectar cientos de schemas de un MCP/OpenAPI de una — descubrimiento perezoso vía CLI (`--list`, `--search`, `--help`). |
| [`mavre-tool-router`](skills/mavre-tool-router) | Catálogo curado de herramientas open source/self-hosted por tarea (scrape, enrich, browser, notify) — sin vendor lock-in. |

## Instalar una skill

```bash
npx skills add FacundoMaco/mavreskills --skill mavre-tool-guard
```

Cambiá `mavre-tool-guard` por el nombre de la skill que quieras. También podés copiar la carpeta a mano:

```bash
cp -r skills/<nombre> ~/.claude/skills/<nombre>
```

## Estado y tracción

Ver [`skills.config.json`](skills.config.json) para el estado (activa/archivada) de cada skill.

---

<div align="center">

Mantenido por [MavreWorks](https://mavreworks.com)

</div>
