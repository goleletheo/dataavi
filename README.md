# Aviator Predictor Analytics — Full-stack starter

## Run locally
Requires Node.js 18.17+ (Node 20 LTS recommended).
```bash
npm install
npm run dev
```
Open http://localhost:3000. For production: `npm run build` then `npm start`.

## Features
- Next.js 14 App Router, TypeScript, Tailwind, Recharts, Framer Motion and Lucide icons.
- Dark responsive dashboard inspired by the provided reference.
- SQLite database created automatically in `data/aviator.sqlite`, seeded with 30 illustrative sample rounds.
- Manual completed-round entry; rounds persist across reloads/restarts.
- Searchable history page and settings page.
- API routes: `GET/POST /api/rounds`, `POST /api/prediction`.
- Moving average, weighted recent history, volatility, trend heuristic, and theoretical target probability estimate.

## API quick test
```bash
curl http://localhost:3000/api/rounds
curl -X POST http://localhost:3000/api/rounds -H "Content-Type: application/json" -d '{"round_id":"test-001","multiplier":2.45}'
curl -X POST http://localhost:3000/api/prediction -H "Content-Type: application/json" -d '{"method":"AI Model","target":5,"bet":35}'
```

## Important
- Seeded sample data is illustrative, not real casino history. No live casino integration is included.
- Crash outcomes are designed to be unpredictable. Historical analysis cannot reliably predict the next multiplier.
- “Confidence” is a heuristic stability score, not a calibrated probability of a correct prediction. Probability values are theoretical approximations blended with sample frequency, not verified casino-specific odds.
- The Provably Fair badge is UI only. Real verification requires the specific game's algorithm, revealed server seed, client seed, nonce and hash rules.
- SQLite's local file persistence is intended for local use. Serverless deployment platforms may not persist local SQLite storage; use a managed database for production deployment.
