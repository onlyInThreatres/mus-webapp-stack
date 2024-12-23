# 🏗️ Architecture Overview

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Backend**: Supabase
- **Authentication**: Supabase Auth + Auth.js
- **Database**: PostgreSQL (via Supabase)
- **Styling**: TailwindCSS + shadcn/ui
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions + Vercel

## Project Structure

```
├── app/                  # Next.js App Router
├── components/           # React components
├── lib/                 # Utilities and helpers
├── hooks/               # Custom React hooks
├── tests/               # Test suites
└── docs/                # Documentation
```

## Key Features

1. **Authentication**
   - Email/Password via Supabase
   - OAuth providers (planned)
   - Protected routes

2. **Database**
   - User profiles
   - Subscriptions
   - Audit logs

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Security**
   - Environment variable protection
   - API route protection
   - Database RLS policies 