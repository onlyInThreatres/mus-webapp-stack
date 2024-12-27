/** @type {import('jest').Config} */
const config = {
  verbose: true,
  projects: [
    {
      displayName: 'Critical',
      testMatch: [
        "**/__tests__/critical/**/*.test.ts",
        "**/__tests__/critical/**/*.spec.ts"
      ],
      testEnvironment: 'node',
      preset: 'ts-jest',
      setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          useESM: true,
          tsconfig: 'tsconfig.json'
        }]
      },
      extensionsToTreatAsEsm: ['.ts', '.tsx'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      transformIgnorePatterns: [
        'node_modules/(?!(@supabase)/)'
      ],
      setupFiles: ['<rootDir>/__tests__/setup/suppress-warnings.js']
    },
    {
      displayName: 'Unit',
      testMatch: ["**/__tests__/unit/**/*.test.ts"],
      // ... same configuration as Critical
    },
    {
      displayName: 'Integration',
      testMatch: ["**/__tests__/integration/**/*.test.ts"],
      // ... same configuration as Critical
    }
  ]
}

module.exports = config 