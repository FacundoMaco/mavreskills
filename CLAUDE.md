# mavreskills

Monorepo de skills de Claude Code generadas por Scout (bot Grok que barre X/Reddit/Product Hunt).
Cada patrón detectado se convierte en una skill instalable, sin categorizar viral/dolor — se shipea, se promociona, se mide tracción.

## Stack real
Sin build. Es una colección de `SKILL.md` + `skills.config.json` como índice/toggle.

## Arquitectura
- `skills/<nombre>/SKILL.md` — una carpeta por skill, formato estándar (frontmatter `name` + `description`, instrucciones).
- `skills.config.json` — índice de todas las skills: enabled/disabled, origen, fecha de lanzamiento, tracción (stars/mentions/installs).

## Reglas
- Cada skill nace de un `prompt2action.json` generado por Scout. Nunca se agrega una skill manual sin ese origen (excepto la placeholder inicial).
- `enabled: false` en `skills.config.json` = la skill queda archivada pero no se borra (para no perder histórico de tracción).
- Naming: siempre `mavre-<nombre-skill>`.

## Dependencias externas
- Scout (bot Grok, corre en la plataforma Grok, no en este repo) — genera el `prompt2action.json` que dispara cada nueva skill.
- Promoción automática a X/Reddit/foros: pendiente de implementar (fase 2).
