# shadcn-a11y-sandbox

A sandbox for exercising the **`radix-mira`** [shadcn/ui](https://ui.shadcn.com) component style with a focus on **accessibility**. Built on Next.js 16 (Pages Router), React 19, and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm start       # serve production build
npm run lint    # eslint (flat config)
```

No test runner is configured.

## Pages

- **`/`** (`pages/index.tsx`) — accessible dashboard: sidebar nav, tabs, a sortable data table, progress, and slider controls.
- **`/settings`** (`pages/settings.tsx`) — accessible account settings: profile form (`react-hook-form` + `zod`), theme switcher (light / dark / system), and a destructive-action confirmation dialog.

## Stack

- **Next.js 16.2.9** — **Pages Router** (`pages/`), no App Router, no Server Components (`rsc: false`).
- **React 19**.
- **shadcn/ui** — `radix-mira` style (see `components.json`), `baseColor: neutral`, CSS variables on. Components live in `components/ui/` and are generated via the shadcn CLI.
- **Radix UI** — the single `radix-ui` package (e.g. `import { Slot } from "radix-ui"`), not per-primitive `@radix-ui/*` packages.
- **Tailwind CSS v4** — CSS-first config in `styles/globals.css` (no `tailwind.config.js`). Theme tokens are `oklch()` custom properties under `:root` / `.dark`; dark mode toggles the `dark` class on an ancestor.
- **Icons** — `@hugeicons/react` + `@hugeicons/core-free-icons`.
- **Forms** — `react-hook-form` + `zod` (`@hookform/resolvers`).
- **TypeScript** — strict mode, path alias `@/*` → repo root.

## Project Notes

This Next.js version has breaking changes from older releases. Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` (`02-pages`). See `CLAUDE.md` and `AGENTS.md` for details.
