import { join } from 'path';
import { config } from 'dotenv';
import { v4 } from 'uuid';
import { execSync } from 'child_process';

const run = (command: string) => execSync(command, { stdio: 'inherit' });

const setupTestDatabase = (): void => {
  console.info('Setup test database');

  const projectRootPath = join(__dirname, '..', '..', '..');

  const prismaBin = join(projectRootPath, 'node_modules', '.bin', 'prisma');

  config({ path: join(projectRootPath, '.env') });

  const schemaId = `test_${v4()}`;
  process.env.DATABASE_SCHEMA = schemaId;

  const databaseURL = join(projectRootPath, 'prisma', `${schemaId}.db`);
  process.env.DATABASE_URL = `file:${databaseURL}`;

  run(`${prismaBin} migrate deploy`);

  console.info(`Database ${schemaId} created`);
};

export default () => {
  console.info('Setup integration test suites');

  setupTestDatabase();

  console.info('Ready test suites. Starting tests...');
};
