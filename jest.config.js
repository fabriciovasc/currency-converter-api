/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/prisma-mock.ts'],
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/api/models/$1',
    '^@services/(.*)$': '<rootDir>/src/api/services/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1'
  }
};
