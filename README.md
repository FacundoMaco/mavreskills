<div align="center">

# mavreskills

**Skills de Claude Code que nacen de lo que la comunidad ya está usando, no de lo que a nosotros se nos ocurrió.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built at GrokBot Build Night](https://img.shields.io/badge/built%20at-GrokBot%20Build%20Night-orange)](#)
[![Skills](https://img.shields.io/badge/skills-3-brightgreen)](#catálogo)

</div>

---

Un bot llamado **Scout** barre X, Reddit y Product Hunt todos los días. Cuando detecta un patrón real —una herramienta, un dolor recurrente, un truco de tooling— que está generando tracción entre developers y AI power users, lo convierte en una skill instalable de Claude Code.

No hay curaduría manual de "esto sí, esto no". Si el patrón es lo bastante fuerte para que Scout lo reporte, se construye y se shipea acá.

## Cómo funciona

```
   X · Reddit · Product Hunt
              │
              ▼
   ┌─────────────────────┐
   │   Scout (Grok)       │  detecta, analiza, compara
   └─────────┬───────────┘
              │  prompt2action.json
              ▼
   ┌─────────────────────┐
   │   Claude Code         │  ejecuta el prompt, construye la skill
   └─────────┬───────────┘
              │
              ▼
     skills/<nombre>/SKILL.md   →  este repo
```

Cada skill queda registrada en [`skills.config.json`](skills.config.json) con su origen, fecha de lanzamiento y tracción (stars, menciones, instalaciones). Ninguna skill se agrega a mano — todas nacen de un patrón real que Scout encontró y justificó.

## Catálogo

| Skill | Qué resuelve | Origen del patrón |
|---|---|---|
| [`mavre-tool-guard`](skills/mavre-tool-guard) | Gate de política pre-ejecución: clasifica el riesgo de cada tool/MCP call antes de correrla, bloquea lo peligroso con alternativa segura, deja pasar lo trivial con audit log. | [Harden](https://www.producthunt.com/products/agent-integrity-foundation-aif) · Product Hunt |
| [`mavre-mcp-lazy-cli`](skills/mavre-mcp-lazy-cli) | Evita inyectar cientos de schemas de un MCP/OpenAPI de una — descubrimiento perezoso vía CLI (`--list`, `--search`, `--help`). | [mcp2cli](https://github.com/knowsuchagency/mcp2cli) · r/ClaudeCode |
| [`mavre-tool-router`](skills/mavre-tool-router) | Catálogo curado de herramientas open source/self-hosted por tarea (scrape, enrich, browser, notify) — sin marketplace pago ni billing. | Monid · Product Hunt (adaptado a OSS) |

## Instalar una skill

```bash
cp -r skills/<nombre> ~/.claude/skills/<nombre>
```

O una sola línea para instalar todas:

```bash
git clone https://github.com/FacundoMaco/mavreskills.git /tmp/mavreskills \
  && cp -r /tmp/mavreskills/skills/* ~/.claude/skills/
```

## Cómo entra una skill nueva

1. Scout corre su barrido diario (weekdays, 9:00) sobre X, Reddit y Product Hunt.
2. Cuando encuentra un patrón fuerte, entrega un `prompt2action.json`: contexto analizado, mini-plan, y un prompt ejecutable listo para un agente de código.
3. Claude Code (o cualquier agente CLI) ejecuta ese prompt y construye el `SKILL.md`.
4. Se registra en `skills.config.json` y se pushea acá — un [GitHub Action](.github/workflows/promote-skill.yml) la promociona en X y Reddit automáticamente.

El pipeline completo (`scout/system-prompt.json`) también es público — si querés correr tu propio Scout, ahí está la config exacta.

## Roadmap

- [ ] Panel de tracción real (stars/installs por skill) en vez de contadores manuales.
- [ ] `mavre-mcp-meta-gateway` — hermano mayor de `mavre-tool-router`, en validación en el pipeline `realpainproducts` (próximamente).

---

<div align="center">

Construido en vivo durante **GrokBot Build Night** · Scout detecta, Claude Code ejecuta.

</div>
