# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # start dev server at http://localhost:3000
npm run build   # production build
npm start       # serve production build
npm run lint    # eslint (flat config)
```

No test runner is configured.

## Critical: Next.js 16 + Pages Router

- This is **Next.js 16.2.9** with the **Pages Router** (`pages/`), not the App Router. There is no `app/` directory.
- APIs differ from older Next.js. Per `AGENTS.md`, **read the relevant guide under `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) before writing Next.js code** - do not assume training-data conventions hold.
- React 19. `pages/_app.tsx` is the global wrapper; `pages/_document.tsx` sets `<html lang>` and `<body>`. API routes live in `pages/api/`.

## Architecture

shadcn/ui sandbox for exercising the **`radix-mira`** component style (see `components.json`). Components are generated via the shadcn CLI, not hand-written from scratch.

- **shadcn config** (`components.json`): `style: radix-mira`, `rsc: false` (Pages Router, no Server Components), `iconLibrary: hugeicons`, `baseColor: neutral`, CSS variables on. Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.
- **UI components** (`components/ui/`): use the single **`radix-ui`** package (e.g. `import { Slot } from "radix-ui"`), not per-primitive `@radix-ui/*` packages. Pattern: `cva` variants + `data-slot` / `data-variant` / `data-size` attributes for styling hooks, `asChild` via `Slot.Root`.
- **Icons**: `@hugeicons/react` + `@hugeicons/core-free-icons`.
- **`cn()`** (`lib/utils.ts`): `twMerge(clsx(...))` - the standard class-merge helper used by every component.

## Styling: Tailwind v4 (CSS-first)

- **No `tailwind.config.js`.** Configuration is CSS-first in `styles/globals.css`, which `@import`s `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`. PostCSS plugin `@tailwindcss/postcss` (see `postcss.config.mjs`).
- Theme tokens are CSS custom properties in `oklch()` under `:root` and `.dark`. Dark mode via the `@custom-variant dark (&:is(.dark *))` rule - toggle the `dark` class on an ancestor.

## TypeScript

Path alias `@/*` → repo root (`tsconfig.json`). Strict mode on.
