# MUS Webapp Stack

## Testing Infrastructure 🧪

## 🚀 Features & Progress

- ✅ Next.js 14 App Router
- ✅ Supabase Integration
- ✅ TypeScript & Type Safety
- ✅ Testing Infrastructure
  - Jest Configuration
  - Multiple Test Suites
  - CI/CD Pipeline
- 🏗️ Database Schema (In Progress)
- 📋 Authentication (Coming Soon)
- 🎨 UI Components (Planned)
- 💳 Payments (Planned)

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Database:** Supabase
- **Authentication:** Supabase Auth + Auth.js
- **Styling:** Tailwind CSS + shadcn/ui
- **Testing:** Jest + React Testing Library
- **CI/CD:** GitHub Actions + Vercel

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/onlyInTheatres/mus-webapp-stack.git
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example env file:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing Infrastructure 🧪

Our test suite is organized into three categories:

### Critical Tests (🚨)
- Core functionality tests
- Database connectivity
- Authentication flows
- Located in `__tests__/critical/`
- Run with: `npm run test:critical`

### Integration Tests (🔗)
- API endpoint testing
- Cross-component functionality
- Located in `__tests__/integration/`
- Run with: `npm run test:integration`

### Unit Tests (🧪)
- Individual component testing
- Utility function testing
- Located in `__tests__/unit/`
- Run with: `npm run test:unit`

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:critical
npm run test:integration
npm run test:unit
```

### Environment Setup

Required environment variables in `.env.test`:
```plaintext
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

For CI/CD, ensure these secrets are set in GitHub:
- `TEST_SUPABASE_URL`
- `TEST_SUPABASE_ANON_KEY`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`

## 📚 Documentation

- [System Architecture](./SYSTEM_USAGE.md)
- [Contributing Guidelines](./.github/CONTRIBUTING.md)
- [Security Policy](./.github/SECURITY.md)
- [Wiki](https://github.com/onlyInTheatres/mus-webapp-stack/wiki)

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

## 🤖 CI/CD Setup

Add these secrets to your GitHub repository:

1. Go to Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `TEST_SUPABASE_URL`: Your test Supabase project URL
   - `TEST_SUPABASE_ANON_KEY`: Your test Supabase anonymous key
   - `SUPABASE_ACCESS_TOKEN`: Your Supabase access token
   - `SUPABASE_DB_PASSWORD`: Database password
   - `SUPABASE_PROJECT_ID`: Project ID

To run tests in CI, you need to set up these repository secrets:

1. `TEST_SUPABASE_URL`: Your test database URL
2. `TEST_SUPABASE_ANON_KEY`: Your test database anon key

These should point to a dedicated test database, not production!
