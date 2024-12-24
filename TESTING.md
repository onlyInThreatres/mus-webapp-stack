# Testing Strategy

## Overview

Our testing infrastructure is designed to ensure reliability and maintainability of the codebase through three layers of testing:

### 🚨 Critical Tests
Core functionality tests that must pass for the application to be considered operational:
- Database connectivity
- Authentication flows
- Core business logic

### 🔗 Integration Tests
Tests that verify different parts of the application work together:
- API endpoints
- Cross-component functionality
- Data flow between services

### 🧪 Unit Tests
Individual component and utility function tests:
- UI components
- Helper functions
- Isolated functionality

## Test Environment

### Local Setup
1. Create `.env.test` file
2. Add required environment variables
3. Run `npm test` to execute all tests

### CI/CD Setup
Tests run automatically on:
- Pull requests to main/develop
- Push to main/develop

Required GitHub secrets:
- `TEST_SUPABASE_URL`
- `TEST_SUPABASE_ANON_KEY`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`

## Best Practices

1. Keep tests focused and isolated
2. Use meaningful test descriptions
3. Follow AAA pattern (Arrange, Act, Assert)
4. Add comments for complex test scenarios
5. Use appropriate test categories 