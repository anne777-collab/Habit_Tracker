# Momentum — Goal & Habit Tracker

Next.js 15 tracker for habits, daily goals, calendar history, streaks, heatmaps, journal reflections, achievements, reminders, and private AI insights.

## Local setup

1. Copy `.env.example` to `.env` and add your Neon pooled `DATABASE_URL` and direct `DIRECT_URL`.
2. Add Auth.js, Google, Resend, OpenAI, and cron credentials.
3. Run `npm run db:generate`, `npx prisma migrate dev --name init`, then `npm run db:seed`.
4. Start with `npm run dev`.

## Production

Set every variable from `.env.example` in Vercel. Point `DATABASE_URL` at Neon’s pooled connection and `DIRECT_URL` at the direct connection. Run `npm run db:migrate` against production before deploying. Configure the Vercel cron request with `CRON_SECRET`; Vercel invokes `/api/cron/reminders` every 15 minutes.

Journal content is never sent to OpenAI unless `includeInAi` was explicitly enabled for that entry.
