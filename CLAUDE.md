# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (Vite, localhost:5173)
npm run build      # production build
npm run preview    # preview production build locally
```

There are no test or lint commands configured.

## Architecture

This is a single-page React application with no routing library — all navigation is driven by a `view` state variable in `App()`.

### File structure

Everything lives in `src/App.jsx` (~300KB), which contains:
- A CSS string injected via `<style>{CSS}</style>` — all styles are defined in the `CSS` template literal at the top of the file
- Constants (`STAGES`, `SCALE`, `STATUS`, `INIT_ENGS`, assessment questions, etc.)
- Utility functions (`uploadFile`, `generatePDF`, `generateDOCX`, etc.)
- All React components defined as local functions within the same file

`api/ai.js` and `api/send-email.js` are Vercel Edge Functions — they run serverside and are not bundled into the frontend.

### Data layer

- **Supabase** (`src/supabase.js`) handles auth for coaches and persists engagements in an `engagements` table (`app_id`, `coach_id`, `data` JSONB)
- `INIT_ENGS` is hardcoded seed data that fills in when no DB record exists for that `app_id`
- `updateEng(id, patch)` merges a patch into state and upserts to Supabase; all writes go through this function

### User roles and access

The app detects the current role from URL params on load (before any auth):

| Role | URL param | Auth |
|---|---|---|
| Coach | none | Supabase email/password |
| Coachee | `?code=CE-{id}` | none |
| Stakeholder | `?code=ST-{engId}-{shId}` | none |
| Líder | `?code=LD-{engId}-{liderId}` | none |
| Public assessment | `?assess={token}` | none |

Coach login uses Supabase Auth. All other roles use code-based access — no passwords.

### View routing (coach)

After coach login, `view` state controls what's shown. Coach nav items: `processos`, `arquivados`, `briefings`, `biblioteca`. Drilling into an engagement sets `view='eng'` and `activeEng` (engagement id). From engagement detail, coaches can impersonate other roles by setting `user.role` and `view`.

### External services

- **AI**: `api/ai.js` proxies to Anthropic's API using `claude-haiku-4-5-20251001` — requires `ANTHROPIC_API_KEY` env var on Vercel
- **Email**: `api/send-email.js` sends via Resend — requires `RESEND_API_KEY` env var on Vercel

### Environment variables

For local dev, create a `.env.local`:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

The Vercel Edge Functions read `ANTHROPIC_API_KEY` and `RESEND_API_KEY` from Vercel environment settings (not Vite — these are never exposed to the browser).

### Key conventions

- All inline styles use class names from the `CSS` string — avoid adding `style={{}}` props for things that can use a class
- Engagement mutations always go through `updateEng(id, patch)` so Supabase stays in sync
- Stakeholder lists are split into `stakeholders360` (360° feedback form) and `stakeholdersMS` (mini-survey respondents) within each engagement object
