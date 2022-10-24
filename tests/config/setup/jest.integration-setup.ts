import { join } from 'path';
import { config } from 'dotenv';
import { v4 } from 'uuid';
import { execSync } from 'child_process';

const run = (command: string) => execSync(command, { stdio: 'inherit' });

const setupTestDatabase = (): void => {
  console.info('Setup test database');

  config({ path: join(__dirname, '..', '..', '..', '.env.test') });

  const schemaId = `test_${v4()}`;
  process.env.DATABASE_SCHEMA = schemaId;

  process.env.DATABASE_URL = `${process.env.DATABASE_URL}?schema=${schemaId}`;

  run('npm run prisma:deploy');

  console.info(`Database ${schemaId} created`);
};

export default () => {
  console.info('Setup integration test suites');

  setupTestDatabase();

  console.info('Ready test suites. Starting tests...');
};
