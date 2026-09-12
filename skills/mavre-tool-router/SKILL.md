---
name: mavre-tool-router
description: Router de herramientas open source/gratuitas por tarea. Cuando el agente necesita scrapear, enriquecer datos, automatizar browser o mandar notificaciones, elige de un catálogo curado la opción OSS/self-hosted en vez de inventar una integración paga desde cero. Usar cuando el usuario pide "necesito hacer X" y X requiere una capacidad externa que no está integrada todavía.
---

# mavre-tool-router

Elegir e integrar una herramienta externa para cada tarea nueva (scraping, enrichment, browser, notify) es fricción repetida — acá se prioriza siempre la opción **open source o self-hosted** por sobre servicios pagos con vendor lock-in.

## Catálogo starter

| Categoría | Herramienta OSS | Cuándo usarla |
|---|---|---|
| **Scrape** | [Crawlee](https://crawlee.dev) (Node/Python) | Scraping robusto con reintentos, rotación, respeta robots.txt |
| **Scrape** | [Playwright](https://playwright.dev) | Páginas con JS pesado, requiere navegador real |
| **Enrich** | [Clearbit free tier](https://clearbit.com) → si no alcanza, scraping directo del sitio de la empresa | Datos de empresa/dominio a partir de un email o dominio |
| **Enrich** | [Nominatim (OpenStreetMap)](https://nominatim.org) | Geocoding gratis, sin key, sin límite agresivo |
| **Browser** | [Playwright](https://playwright.dev) | Automatizar flujos (login, click, formularios) |
| **Browser** | [Browser-use](https://github.com/browser-use/browser-use) | Automatización guiada por agente, ya integra Playwright |
| **Notify** | Webhook propio + [ntfy.sh](https://ntfy.sh) (self-hosted opcional) | Notificaciones push sin depender de Slack/Twilio |
| **Notify** | SMTP directo (Gmail MCP ya disponible en este entorno) | Email, ya hay integración |

## Qué hacer

1. **Identificar la tarea**: qué capacidad externa se necesita (scrape / enrich / browser / notify / otra).
2. **Buscar en el catálogo** de arriba antes de proponer un servicio pago o escribir integración desde cero.
3. **Si ninguna opción del catálogo alcanza**: proponer la alternativa OSS más cercana (buscar en GitHub por el caso puntual) antes de sugerir un SaaS pago. Solo sugerir pago si no existe opción OSS viable y el usuario lo pide explícitamente.
4. **Invocar directo**: no hay capa de billing ni balance — cada herramienta se usa con su propia instalación/config local (npm install, pip install, etc.), sin intermediario que cobre por llamada.
5. **Ampliar el catálogo**: si se usa una herramienta OSS nueva que no está en la tabla y funcionó bien, agregarla acá con una fila (categoría, herramienta, cuándo usarla).

## Ejemplo

Usuario pide: "necesito los datos de la empresa dueña de este dominio".
Router: busca en catálogo → categoría "Enrich" → prueba Clearbit free tier primero; si no da resultado, cae a scraping directo del sitio con Crawlee. Nunca propone un SaaS de enrichment pago sin que el usuario lo pida.
