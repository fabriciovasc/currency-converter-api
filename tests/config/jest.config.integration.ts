import defaultConfig from './jest.config.base';
import type { Config } from 'jest';

const integrationConfig: Config = {
  ...defaultConfig,
  globalSetup: './setup/jest.integration-setup.ts',
  globalTeardown: './setup/jest.integration-destroy.ts',
  roots: ['../integration/']
};

export default integrationConfig;
