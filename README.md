# DevTrack

A personal developer activity tracker that helps you build consistent coding habits. Log focused sessions with a built-in Pomodoro timer, track streaks, and measure productivity over time.

## Features

- **Pomodoro Timer** — countdown timer with document title sync and session controls
- **Session Logging** — record sessions with duration, tags, and notes
- **Streak Tracking** — visualize your daily coding consistency
- **Google OAuth** — sign in with your Google account via NextAuth
- **Wallpaper Selector** — customize your focus environment
- **Animated Landing Page** — Hero, Features, and Testimonials sections with GSAP/Motion animations
- **Charts** — session history visualized with Recharts

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL via Prisma |
| Auth | NextAuth v4 (Google OAuth) |
| State | Zustand |
| Animation | GSAP, Motion |
| Charts | Recharts |
| UI Primitives | Radix UI, Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
git clone https://github.com/your-username/devtrack.git
cd devtrack
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
AUTH_SECRET=replace-with-a-random-32-char-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=postgresql://user:password@localhost:5432/devtrack
```

To get Google OAuth credentials, create a project at [console.cloud.google.com](https://console.cloud.google.com), enable the Google+ API, and add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
devtrack/
├── app/               # Next.js App Router pages
│   ├── tracker/       # Tracker page (protected)
│   └── page.tsx       # Landing page
├── components/        # Reusable UI components
├── sections/          # Landing page sections (Hero, Features, Testimonials)
├── controllers/       # Request handlers
├── services/          # Business logic
├── models/            # Data models
├── hooks/             # Custom React hooks
├── context/           # React context (TimerContext)
├── store/             # Zustand stores
├── lib/               # Utilities and DB client
├── prisma/            # Prisma schema
└── docker/            # Docker Compose for local Postgres
```

## Docker (Local Database)

If you don't have a local Postgres instance, spin one up with Docker:

```bash
docker compose -f docker/docker-compose.yml up -d
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start production server |

## License

MIT
