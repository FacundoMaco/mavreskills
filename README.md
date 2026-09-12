# mavreskills

Skills de Claude Code generadas automáticamente por **Scout**, un bot Grok que barre X, Reddit y Product Hunt buscando patrones de código/tooling que la comunidad de developers y AI power users está usando ahora mismo.

Cada patrón detectado se convierte en un `SKILL.md` listo para instalar. Sin categorías de "viral" o "dolor real" — si Scout lo detectó y vale la pena, se shipea.

## Instalar una skill

```bash
cp -r skills/<nombre> ~/.claude/skills/<nombre>
```

## Catálogo

Ver `skills.config.json` para el estado (activa/archivada) y tracción de cada skill.

## Cómo nace una skill acá

```
Scout (Grok) detecta patrón → prompt2action.json → Claude Code construye la skill → se shipea acá
```

Construido durante **GrokBot Build Night**.
