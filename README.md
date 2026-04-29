# Dictator

Dictator is a full-stack vocabulary learning platform built with Next.js. It helps users search words, understand definitions, hear pronunciations, save vocabulary, and practice words through a personalized learning dashboard.

The project combines an animated user interface with authentication, PostgreSQL persistence, Redis caching, and AI-powered word enrichment.

## Features

- AI-assisted word lookup with definitions, synonyms, antonyms, example sentences, and pronunciation links.
- Redis-backed caching for faster repeated word searches.
- Credentials, Google, and GitHub authentication through NextAuth.
- Personal vocabulary dashboard for saved words.
- Practice page with multiple learning modes and basic spaced-repetition recommendations.
- User progress stats including saved words, completed exercises, estimated study time, and accuracy.
- Animated responsive UI with Tailwind CSS, Framer Motion, custom fonts, particle backgrounds, and reusable components.
- Dockerized production setup with Next.js standalone output, PostgreSQL, Redis, health checks, and Prisma schema sync.

## Tech Stack

- Framework: Next.js 15, React 19, TypeScript
- Styling: Tailwind CSS 4, custom local fonts
- Animation/UI: Framer Motion, Jotai, react-hot-toast
- Authentication: NextAuth, Prisma adapter, credentials, Google OAuth, GitHub OAuth
- Database: PostgreSQL with Prisma ORM
- Cache: Redis
- AI/Word generation: GitHub Models through `@azure-rest/ai-inference`
- Deployment: Docker, Docker Compose, Next.js standalone server

## Project Structure

```text
.
|-- components/              # Shared UI components
|-- prisma/                  # Prisma schema
|-- scripts/                 # Docker runtime scripts
|-- src/
|   |-- app/                 # Next.js App Router pages, API routes, server actions
|   |-- lib/                 # Auth, Prisma, Redis clients
|   |-- services/            # Additional service experiments/utilities
|   `-- types/               # TypeScript module declarations
|-- store/                   # Jotai atoms
|-- Dockerfile
`-- docker-compose.yml
```

## Environment Variables

Create a `.env.local` file for local development:

```env
DATABASE_URL="postgresql://user:password@localhost:5433/dictator?schema=public"
REDIS_URL="redis://localhost:6379"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-secure-random-secret"

NEXT_GITHUB_TOKEN="your-github-models-token"

GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""
```

For Docker, create `.env.docker`:

```env
DATABASE_URL=postgresql://user:password@postgres:5432/dictator?schema=public
REDIS_URL=redis://redis:6379

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-secure-random-secret

NEXT_GITHUB_TOKEN=your-github-models-token

GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
```

Do not commit real secrets. Rotate any token that was accidentally committed.

## Run Locally

Install dependencies:

```bash
npm install
```

Start PostgreSQL and Redis. The easiest way is to run only the supporting services with Docker:

```bash
docker compose up -d postgres redis
```

Generate Prisma Client:

```bash
npx prisma generate
```

Sync the database schema:

```bash
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Run With Docker

Build and start the full stack:

```bash
docker compose up -d --build
```

This starts:

- Next.js app on `http://localhost:3000`
- PostgreSQL on host port `5433`
- Redis on host port `6379`

Check running services:

```bash
docker compose ps
```

View app logs:

```bash
docker compose logs app -f
```

Stop the stack:

```bash
docker compose down
```

Remove the database volume as well:

```bash
docker compose down -v
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build production app
npm run start    # Start production server
npm run lint     # Run lint command
```

## Core Pages

- `/` - Landing and word search experience.
- `/search?word=example` - Word definition result page.
- `/login` - Sign in and registration page.
- `/dashboard` - Saved vocabulary and user stats.
- `/practice` - Vocabulary practice modes and recommendations.
- `/api/auth/[...nextauth]` - NextAuth API route.

## How It Works

1. The user enters a word from the home page or search page.
2. The app checks Redis for cached word data.
3. If the word is not cached, the server action calls GitHub Models and asks for structured vocabulary data.
4. The result is stored in Redis with a 24-hour expiry.
5. Logged-in users can save words to PostgreSQL through Prisma.
6. Dashboard and practice pages use saved words and practice history to personalize the experience.

## Database Models

The Prisma schema includes standard NextAuth models plus:

- `SavedWord` - stores words saved by each user.
- `PracticeHistory` - tracks user practice attempts and success.
- `User.password` - supports credentials authentication.

## Docker Notes

The Docker image uses Next.js standalone output for a smaller runtime container. On startup, the app container prepares the database schema:

- If Prisma migrations exist, it runs `prisma migrate deploy`.
- If no migrations exist, it runs `prisma db push --skip-generate`.

Prisma Client is generated during the image build.

## Production Considerations

Before deploying publicly:

- Use strong `NEXTAUTH_SECRET` values.
- Configure real OAuth credentials for Google and GitHub.
- Rotate and protect all API tokens.
- Prefer Prisma migrations over `db push` for long-term production environments.
- Review dependency audit warnings and update packages where practical.
- Replace development URLs with your production domain.

## Status

Dictator is structured as a major full-stack portfolio project with authentication, persistence, caching, AI integration, and Dockerized deployment. The project currently builds successfully and runs through Docker Compose.
