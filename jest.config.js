const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './jest.global-setup.js',
  globalTeardown: './jest.global-teardown.js',
  setupFilesAfterEnv: ['<rootDir>/tests/prisma-mock.ts'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
};
