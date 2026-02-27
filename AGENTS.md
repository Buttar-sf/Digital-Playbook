# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript application bootstrapped with Vite.

### Tech Stack
- **Runtime**: Node.js 22.x
- **Framework**: React 19 + TypeScript 5.9
- **Build tool**: Vite 7
- **Linter**: ESLint 9

### Commands
- `npm run dev` — start the dev server (port 5173)
- `npm run build` — TypeScript check + production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build

### MCP Configuration
The Egis Design System MCP server is configured in `.cursor/mcp.json` using HTTP transport at `https://design-system.egis-group.io/mcp`. This endpoint is not reachable from cloud VMs (DNS cannot resolve). It works when the project is opened in a local Cursor instance with access to the Egis network.
