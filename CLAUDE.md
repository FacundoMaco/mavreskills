# mavreskills

Monorepo de skills de Claude Code mantenidas por MavreWorks.

## Stack real
Sin build. Es una colección de `SKILL.md` + `skills.config.json` como índice/toggle.

## Arquitectura
- `skills/<nombre>/SKILL.md` — una carpeta por skill, formato estándar (frontmatter `name` + `description`, instrucciones).
- `skills.config.json` — índice de todas las skills: enabled/disabled, fecha de lanzamiento, tracción (stars/mentions/installs).

## Reglas
- `enabled: false` en `skills.config.json` = la skill queda archivada pero no se borra (para no perder histórico de tracción).
- Naming: siempre `mavre-<nombre-skill>`.

## Dependencias externas
- Promoción automática: GitHub Action (`.github/workflows/promote-skill.yml`) postea a X y Reddit cuando se agrega un `SKILL.md` nuevo a `main`. Credenciales en GitHub Secrets del repo (`X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`, `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`, `REDDIT_SUBREDDIT`). Sin esas secrets configuradas, el job corre pero no postea (se salta con log).
