# 🏗️ System Architecture

## Directory Structure

```
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   ├── auth/                 # Auth-related pages
│   ├── dashboard/           # Protected routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   └── auth/                # Auth components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
│   ├── supabase/           # Supabase client & helpers
│   └── utils/              # General utilities
├── middleware.ts           # Route protection
├── public/                 # Static assets
└── tests/                  # Test suites
    ├── setup/              # Test configuration
    └── e2e/               # E2E tests
```

## 🔒 Authentication Flow

1. User signs in via Supabase Auth
2. Session is managed via middleware
3. Protected routes check auth status

## 🗄️ Database Schema

Core tables:
- `profiles`: User profile information
- `subscriptions`: Subscription status
- `audit_logs`: System events

## 🧪 Testing Strategy

- **Unit Tests**: Components and utilities
- **Integration Tests**: API routes
- **E2E Tests**: Critical user flows
- **CI/CD**: Automated via GitHub Actions

## 📚 Additional Resources

- [Component Documentation](./components/ui/README.md)
- [API Documentation](./app/api/README.md)
- [Testing Guide](./tests/README.md)
