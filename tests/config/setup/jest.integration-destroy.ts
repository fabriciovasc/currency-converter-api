import { join } from 'path';
import { config } from 'dotenv';
import pg from 'pg';

const destroyTestDatabase = async () => {
  config({ path: join(__dirname, '..', '..', '..', '.env.test') });
  const schemaId = process.env.DATABASE_SCHEMA;

  console.info(`Deleting schema ${schemaId}`);

  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await client.end();

  console.info(`Schema ${schemaId} deleted`);
};

export default async () => {
  console.info('Destroying integration test environment');

  await destroyTestDatabase();

  console.info('Integration test environment destroyed');
};
