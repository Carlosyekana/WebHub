# WebHub — Hub de Ciudades LATAM & Caribe

Propuesta interactiva de plataforma web para el **Hub de Ciudades de Latinoamérica y el Caribe** (iniciativa nacida con el BID en 2023 y consolidada junto al **City Science Lab MIT – Universidad de Guadalajara**).

Construido sobre **Node.js + Vite + React + TypeScript + Tailwind CSS + Motion**, diseñado para desplegarse en hosting moderno/CDN (Vercel, Cloudflare Pages, Netlify o servidor Node.js) sin cuellos de botella ni errores `508`.

---

## Requisitos

* **Node.js** `>= 20.x` (probado en `v22.22.3`)
* **npm** `>= 10.x`

---

## Instalación y desarrollo local (Node.js)

```bash
# 1. Clonar e ir a la rama
git clone https://github.com/Carlosyekana/WebHub.git
cd WebHub
git checkout arena/965f8b40-webhub

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev
# Abre http://localhost:5173

# 4. Compilar para producción
npm run build

# 5. Previsualizar build de producción
npm run preview
```

---

## Estructura del proyecto

* `src/App.tsx` — Navegación principal de 4 capítulos + paleta rápida (`⌘K` / `Ctrl+K`) + selector `ES / PT`.
* `src/components/TopFloatingNav.tsx` — Barra superior flotante minimalista con indicador animado.
* `src/components/ParticleNetworkCanvas.tsx` — Canvas 60fps reactivo al cursor conectando ciudades de la red.
* `src/components/KineticHomeSection.tsx` — Portada kinética, métricas clave y progresión guiada en 3 pasos.
* `src/components/IsometricCityStack.tsx` — Diagrama interactivo 3D isométrico de 3 capas (*Territorio & Pilotos*, *Gobernanza & Sandboxes*, *Ciencia de Ciudades MIT–UdeG*).
* `src/components/LoopSolutionsSection.tsx` — Ciclo de innovación `1/5 → 5/5` y Banco de Soluciones Replicables con Simulador Municipal.
* `src/components/SessionsAndMapSection.tsx` — Agenda en vivo, encuesta, Q&A previo, cátedras MIT/Estonia/Moreno, glosario interactivo *"Fácil y Simple"*, mapa espacial de 30 gobiernos y línea de tiempo de Bootcamps.
* `src/components/DiagnosticAndJoinSection.tsx` — Gráfico radar SVG en tiempo real de 5 ejes (*Permiso vs Compromiso*), Matchmaking ciudad–startup y onboarding segmentado.
* `src/data/hubData.ts` — Dataset estructurado de ciudades, puntos focales, pilotos, cátedras y bootcamps.
