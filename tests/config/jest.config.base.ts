import { compilerOptions } from '../../tsconfig.json';
import type { Config } from 'jest';

import { pathsToModuleNameMapper } from 'ts-jest';

const defaultConfig: Config = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/../../src'],
  moduleDirectories: ['<rootDir>/../../node_modules', '<rootDir>/../../src'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../..' })
};

export default defaultConfig;
