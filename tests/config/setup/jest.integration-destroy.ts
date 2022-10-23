import { join } from 'path';
import { execSync } from 'child_process';
import { config } from 'dotenv';

const run = (command: string) => execSync(command, { stdio: 'inherit' });

const destroyTestDatabase = (): void => {
  const projectRootPath = join(__dirname, '..', '..', '..');

  config({ path: join(projectRootPath, '.env.test') });
  const schemaId = process.env.DATABASE_SCHEMA;

  console.info(`Deleting schema ${schemaId}`);

  const rimRafBin = join(projectRootPath, 'node_modules', '.bin', 'rimraf');

  const prismaRoot = join(projectRootPath, 'prisma');

  const dbFiles = join(prismaRoot, '*.db');
  run(`${rimRafBin} ${dbFiles}`);

  const journalDbFiles = join(prismaRoot, '*.db-journal');
  run(`${rimRafBin} ${journalDbFiles}`);

  console.info(`Schema ${schemaId} deleted`);
};

export default () => {
  console.info('Destroying integration test environment');

  destroyTestDatabase();

  console.info('Integration test environment destroyed');
};
