# 🧪 Testing Strategy

## Database Environments

1. **Remote Development Database** (current setup)
   - URL: `https://pqcgagpijzghdedxwemi.supabase.co`
   - Used for: Development and initial testing
   - Safety: ✅ Safe to modify data

2. **Production Database** (to be set up)
   - URL: Will be different from dev
   - Used for: Production verification tests
   - Safety: ⚠️ Read-only tests only

3. **Local Database** (currently not used)
   - URL: `http://localhost:54321`
   - Used for: Local development
   - Safety: ✅ Safe for all operations

## Test Modes

```typescript
type TestMode = 'remote' | 'local' | 'production' | 'ci';
```

- `remote`: Uses development database
- `local`: Uses local Supabase instance
- `production`: Uses production database (read-only)
- `ci`: Uses CI/CD specific database

## Running Tests

```bash
# Development testing
npm run test:critical    # Uses remote dev database

# Production verification (read-only)
TEST_MODE=production npm run test:critical

# Local testing (when available)
TEST_MODE=local npm run test:critical
```

## 1. Critical Path Tests
- Authentication flows
- Database operations
- API endpoints
- Security policies

## 2. Integration Tests
- Supabase client operations
- Auth flows
- Database triggers
- RLS policies

## 3. Unit Tests
- Utility functions
- Hooks
- Components
- API handlers

## 4. E2E Tests
- User journeys
- Critical business flows
- Payment processes

## Test Infrastructure
- Jest + React Testing Library
- Playwright for E2E
- Supabase local for integration tests
- MSW for API mocking

## Priority Order:
1. 🔒 Security & Auth tests
2. 💾 Database operation tests
3. 🔌 API endpoint tests
4. 🎨 Component tests 