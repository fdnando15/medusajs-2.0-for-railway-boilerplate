# AGENTS.md — Sigrid Bolsos Monorepo

Monorepo for **Sigrid Bolsos** (sigridbolsos.com), a handmade handbag e-commerce store.
Two apps: `backend/` (MedusaJS 2.x) and `storefront/` (Next.js 15 App Router).

## Build / Dev / Lint / Test Commands

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Medusa dev server (hot reload) |
| `pnpm build` | Production build (`medusa build` + postBuild script) |
| `pnpm start` | Init backend + start production server |
| `pnpm seed` | Run seed script (`medusa exec ./src/scripts/seed.ts`) |
| `pnpm ib` | Init backend (alias for `init-backend`) |
| `pnpm email:dev` | Preview email templates on port 3002 |
| `pnpm test:store` | Run store test script |

### Storefront (`storefront/`)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build (waits for backend) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint (`next lint`) |
| `pnpm test-e2e` | Run all Playwright E2E tests |

### Running a Single E2E Test

```bash
# From storefront/
npx playwright test e2e/tests/public/cart.spec.ts          # single file
npx playwright test -g "add item to cart"                   # by test name
npx playwright test --project="chromium public" e2e/tests/public/cart.spec.ts
```

### Backend Testing

Jest 29 + `@swc/jest` + `@medusajs/test-utils` are installed as dev deps. No jest.config exists yet — tests would follow Medusa conventions when added.

## Tech Stack

- **Backend**: MedusaJS 2.12.1, Node 22.x, TypeScript 5.9, PostgreSQL, Redis (optional)
- **Storefront**: Next.js 15 (App Router), React 19, TypeScript 5.3, Tailwind CSS 3.x
- **Package manager**: pnpm (9.x in both apps, no root workspace — run commands in each app dir)
- **Payments**: Stripe, PayPal | **Email**: Resend + react-email | **Search**: MeiliSearch (client-side only)
- **File storage**: S3/Supabase (primary) or local fallback
- **E2E**: Playwright | **Backend tests**: Jest (dev dep, no config yet)

## Project Structure

```
backend/src/
  api/            # Custom API routes + middlewares.ts (superadmin guards)
  admin/widgets/  # Admin dashboard guard widgets
  modules/resend/ # Email notification provider (Resend + react-email)
  workflows/      # Order confirmation workflow + steps/
  subscribers/    # Event handlers (order.placed)
  lib/constants.ts# ALL env vars centralized here
  utils/          # assert-value helper
  scripts/        # seed, postBuild, test-store

storefront/src/
  app/            # Next.js App Router pages ([countryCode] dynamic routing)
  modules/        # Feature modules: account, cart, checkout, home, layout, products, etc.
    <module>/components/  # UI components (each in named dir with index.tsx)
    <module>/templates/   # Page-level templates
  lib/data/       # Server-side data fetching (products, regions, orders, etc.)
  lib/util/       # Utility functions (prices, sorting, money formatting)
  lib/config.ts   # Medusa SDK initialization
  lib/hooks/      # Custom React hooks
  styles/         # globals.css (Tailwind + Sigrid custom theme)
  types/          # TypeScript type definitions
```

## Code Style

### Formatting

- **Indentation**: 2 spaces everywhere
- **Semicolons**: Backend uses semicolons; storefront does NOT (no-semi via Prettier)
- **Quotes**: Double quotes in both apps
- **Trailing commas**: ES5 style in storefront (Prettier config), consistent in backend
- **Prettier** (storefront only): `arrowParens: "always"`, `semi: false`, `singleQuote: false`, `tabWidth: 2`, `trailingComma: "es5"`, `endOfLine: "auto"`
- **ESLint** (storefront only): extends `next` and `next/core-web-vitals` — ignored during builds

### Naming Conventions

- **Files/dirs**: `kebab-case` always (`product-actions/`, `send-order-confirmation.ts`)
- **Components**: PascalCase (`ProductActions`, `Hero`, `LineItemPrice`)
- **Functions/variables**: camelCase (`listProducts`, `countryCode`, `handleAddToCart`)
- **Constants (env)**: SCREAMING_SNAKE_CASE (`DATABASE_URL`, `BACKEND_URL`, `REDIS_URL`)
- **Types**: PascalCase, use `type` keyword (never `interface`) — `type ProductActionsProps = { ... }`
- **Enums**: PascalCase with SCREAMING_SNAKE_CASE members (rare; prefer union types)
- **Function prefixes**: `list*` (fetch collection), `retrieve*` (fetch single), `get*` (compute/lookup), `handle*` (event handler)

### Component Patterns

- **Module components**: live in `modules/<domain>/components/<name>/index.tsx`
- **Server components** (default): `export default async function Name(props: { ... }) { ... }`
- **Client components**: add `"use client"` directive, `export default function Name({ ... }: Props) { ... }`
- **Presentational components**: `const Name = () => { ... }` then `export default Name` at bottom
- **Props**: inline types for pages/layouts; separate `type XProps = { ... }` for reusable components

### Exports

- **Components**: `export default` (always)
- **Data functions / utilities / constants**: named exports (`export const listProducts`, `export function assertValue`)
- **API route handlers**: named exports (`export async function GET(...)`)
- **Config objects**: named exports (`export const config = { ... }`)

### Imports

- Order: `"use server"` / `"use client"` directive → external packages (react, next, @medusajs) → internal aliases (`@lib/*`, `@modules/*`) → relative imports
- No enforced import sorting; grouping is conventional, not tooled
- Backend uses `import type { ... }` for type-only imports; storefront does not
- **Path aliases** — Storefront: `@lib/*`, `@modules/*` | Backend: bare paths like `utils/assert-value` or `lib/constants`

### TypeScript

- Strict mode enabled in storefront tsconfig
- Use `type` (never `interface`) for object shapes
- `as` assertions used sparingly where TS can't infer (e.g., `useParams().countryCode as string`)
- Non-null `!` assertions used occasionally for known-good values
- Generics on SDK fetch calls: `sdk.client.fetch<{ products: HttpTypes.StoreProduct[] }>(...)`
- Explicit return types on exported data functions; implicit on components

### Error Handling

- **Storefront data layer**: `try/catch` returning `null` (silent), or `.catch(medusaError)` utility
- **Storefront components**: early return `null` when data is missing
- **Backend services**: `MedusaError` with typed error codes, or `this.logger.error()` + return empty object
- **Backend middleware**: `res.status(403).json({ type: "not_allowed", message: "..." })`
- **Required env vars**: `assertValue(process.env.X, "error message")` throws on missing values

### Data Fetching

- Server components `await` data functions from `@lib/data/*` directly (no useEffect)
- Data functions use the Medusa SDK: `sdk.client.fetch<T>(endpoint, { method, query, headers, next, cache })`
- Client mutations use Next.js server actions (imported and called directly)
- In-memory region map cache with 1-hour TTL in middleware and regions data
- Edge middleware uses raw `fetch()` (SDK unavailable in Edge Runtime)

### Environment Variables

- **Backend**: ALL env vars centralized in `src/lib/constants.ts`, re-exported as typed constants. Uses `assertValue()` for required vars, `??` fallback chains for optional ones
- **Storefront**: accessed inline via `process.env.*` where needed (not centralized)
- Client-exposed vars use `NEXT_PUBLIC_` prefix

### Styling

- Tailwind CSS with `@medusajs/ui-preset` and Sigrid custom theme
- Custom CSS vars in oklch color space, custom classes: `btn-sigrid-primary`, `btn-sigrid-outline`, `text-sigrid-accent`
- Design: zero border-radius, pink/mauve accent (`#ad7777`), Poppins font
- Use `clx()` from `@medusajs/ui` for conditional class merging

### UI Language

- All user-facing text is in **Spanish** (product labels, error messages, admin guards, page names)
- Code comments: **Spanish** for custom/project-specific code, **English** for inherited Medusa boilerplate
- URL slugs in Spanish: `sobre-mi`, `contacto`, `legal`

### Other Conventions

- `data-testid` attributes on interactive elements for E2E tests
- Functional style everywhere; only class used is `ResendNotificationProviderService` (Medusa framework requirement)
- State management: React built-in hooks only (useState, useEffect, useMemo, useRef) — no external state libs
- No barrel exports: import from specific component `index.tsx` files, not module-level barrels
