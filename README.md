# CardVault · TCG Shop Dashboard

A point-of-sale dashboard for a trading card game shop. It covers stock by foil finish, sales orders, receipt lookup and a price watchlist.

It's built from the [TCG Shop Dashboard](https://www.figma.com/make/5jhrPQfYzCCMMbz6vufKus/TCG-Shop-Dashboard) Figma Make design.

**Live:** https://bossymu.github.io/stock-hiteffect-frontend/

## Tech stack

- [React 19](https://react.dev) and TypeScript
- [Vite](https://vite.dev) for the dev server and build
- [Tailwind CSS v4](https://tailwindcss.com), with design tokens in `src/styles/index.css`
- [React Router](https://reactrouter.com) for page routing
- ESLint and Prettier

## Getting started

```bash
nvm use          # Node version from .nvmrc
npm install
npm run dev      # http://localhost:5173
```

| Script              | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server with hot reload |
| `npm run build`     | Type-check, then build to `dist/`    |
| `npm run preview`   | Serve the production build locally   |
| `npm run lint`      | Run ESLint                           |
| `npm run format`    | Format all files with Prettier       |
| `npm run typecheck` | Run the TypeScript compiler only     |

## Pages

| Route        | Page      | What you can do                                                                      |
| ------------ | --------- | ------------------------------------------------------------------------------------ |
| `/`          | Dashboard | See revenue, open and done orders, and recent orders (click one to open its receipt) |
| `/receipt`   | Receipt   | Look up an order by receipt ID                                                       |
| `/stock`     | Stock     | Search, filter, add a card or a whole set, edit stock per foil, remove cards         |
| `/sales`     | Sales     | Filter orders by status and change an order's status                                 |
| `/watchlist` | Watchlist | Track card prices, record new market prices, set accept prices                       |

## Project structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Providers and route table
├── routes/paths.ts          # Route path constants
├── styles/index.css         # Tailwind setup and design tokens (colors, fonts)
│
├── components/              # Shared, reusable components
│   ├── ui/                  # Generic building blocks (Button, Modal, DataTable, badges, …)
│   ├── layout/              # App shell: Sidebar, mobile top bar and bottom nav
│   ├── cards/               # Card catalog search, used by Stock and Watchlist
│   └── orders/              # Order receipt view and modal, used by Dashboard and Receipt
│
├── pages/                   # One folder per route
│   ├── dashboard/
│   ├── receipt/
│   ├── sales/
│   ├── stock/components/    # Components used only by that page
│   └── watchlist/components/
│
├── context/                 # ShopDataContext: cards, orders and watchlist state
├── hooks/                   # useClickOutside, usePagination
├── constants/               # Status, foil, rarity and priority config; color tones
├── data/                    # Card catalog and seed (mock) data
├── types/                   # Domain types: Card, Order, WatchItem
└── utils/                   # Formatting, card calculations, class-name helper
```

### Conventions

- **Where a component goes.** If it's used by more than one page, put it in `src/components/`. If only one page uses it, put it in `src/pages/<page>/components/`.
- **Styling.** Use Tailwind classes with the theme tokens (`bg-card`, `text-muted-foreground`, `text-foil-cf`, `text-rarity-legendary`, …). Don't hard-code hex values in components. To change a color, edit `src/styles/index.css`.
- **Dynamic colors.** Colors that depend on data, like order status or watch priority, map to a _tone_ in `src/constants/tone.ts`. Write the full class names out there so Tailwind can detect them.
- **Imports.** `@/` points to `src/`.
- **Data.** State lives in memory in `ShopDataContext`, starting from the seed data in `src/data/`. To connect a backend, replace the state setters in that provider with API calls. The pages don't need to change.

## Deployment

The site is hosted on **GitHub Pages**. The workflow in `.github/workflows/deploy.yml` does two things:

- On every push and pull request, it runs lint, the format check and the build.
- On pushes to `main`, it also deploys `dist/` to Pages.

It builds with `VITE_BASE_PATH=/<repo-name>/` and copies `index.html` to `404.html`, so deep links like `/stock` work on Pages.
