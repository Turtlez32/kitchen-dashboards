# Kitchen Dashboards

A family-focused kitchen dashboard web application designed for always-on display on a tablet. Shows real-time clock, weather, calendar events, and a to-do list.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4
- **API:** tRPC 11 with TanStack React Query
- **Validation:** Zod, @t3-oss/env-nextjs for type-safe environment variables
- **Serialization:** SuperJSON

## Features

- **Real-time clock** — live-updating time and date display
- **Weather widget** — current conditions and 5-day forecast
- **Calendar** — upcoming events fetched from an external API
- **To-do list** — family task list with categories (groceries, chores, errands, school, fun) and member assignments
- **Seating display** — rotating family member display based on the current date

## Prerequisites

- [Node.js](https://nodejs.org) (v18+) or [Bun](https://bun.sh)
- Network access to `https://api.turtleware.au` (used for calendar and to-do data)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Turtlez32/kitchen-dashboards.git
   cd kitchen-dashboards
   ```

2. **Install dependencies:**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables:**

   The app uses `@t3-oss/env-nextjs` with Zod validation. The only required server variable is `NODE_ENV`, which is set automatically by Next.js.

   To skip environment validation (useful for Docker builds):

   ```bash
   SKIP_ENV_VALIDATION=1 npm run build
   ```

## Development

Start the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start development server   |
| `npm run build` | Build for production        |
| `npm start`     | Start production server     |
| `npm run lint`  | Run ESLint                  |

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── api/trpc/[trpc]/        # tRPC HTTP handler
│   ├── globals.css             # Global styles and Tailwind
│   ├── layout.tsx              # Root layout with tRPC provider
│   └── page.tsx                # Main dashboard page
├── components/                 # Dashboard widgets
│   ├── time.tsx                # Clock display
│   ├── weather.tsx             # Weather widget
│   ├── calendar.tsx            # Calendar events
│   └── todos.tsx               # To-do list
├── server/api/                 # tRPC server
│   ├── root.ts                 # Root router
│   ├── trpc.ts                 # tRPC config
│   └── routers/post.ts        # API route handlers
├── trpc/                       # tRPC client setup
│   ├── server.ts               # Server-side caller (RSC)
│   ├── react.tsx               # Client-side provider
│   └── query-client.ts         # React Query config
├── lib/                        # Utilities
│   ├── use-clock.ts            # Clock hook
│   └── mock-data.ts            # Mock data and types
└── env.js                      # Environment variable schema
```

## Deployment

Build and start the production server:

```bash
npm run build
npm start
```

The app can also be deployed to [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
