import defaultConfig from './jest.config.base';
import type { Config } from 'jest';

const unitConfig: Config = {
  ...defaultConfig,
  setupFilesAfterEnv: ['<rootDir>/setup/prisma-mock.ts'],
  roots: ['../unit/']
};

export default unitConfig;
