# AGENTS.md

## Cursor Cloud specific instructions

This is the **Egis Digital Standards Assistant** — a React + TypeScript web app built with Vite following the Digital Playbook methodology for BIM/SIG projects.

### Tech Stack
- **Runtime**: Node.js 22.x
- **Framework**: React 19 + TypeScript 5.9
- **Build tool**: Vite 7
- **Router**: react-router-dom
- **Icons**: lucide-react
- **Linter**: ESLint 9

### Commands
- `npm run dev` — start dev server (port 5173)
- `npm run build` — TypeScript check + production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build

### Architecture
Navigation follows the Digital Playbook structure:
1. Accueil (home with quick access + ISO 19650 info)
2. Méthodologies → Introduction, Contributeurs
3. Intégration du digital dans les offres → Processus, BPMN interactif, Tâches, Responsabilités, Tableau des offres
4. Démarrage de projet (stub for future content)
5. Questions/Réponses (FAQ)
6. Documentation (Glossaire)

### Branding
Egis green `#8dc63f` as primary color. Role colors from BPMN: yellow (Resp. AO), pink (Réf. AO), green (BIM/SIG Mgr), blue (Chef projet).

### MCP Configuration
`.cursor/mcp.json` configures the Egis Design System MCP at `https://design-system.egis-group.io/mcp`. Not reachable from cloud VMs — works on Egis network only.
