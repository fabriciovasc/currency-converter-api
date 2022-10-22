const { join } = require('path');
const { config } = require('dotenv');
const { v4 } = require('uuid');
const { execSync } = require('child_process');

const prismaBin = join(__dirname, 'node_modules', '.bin', 'prisma');

module.exports = () => {
  console.info('Setup test suites');

  config({ path: join(__dirname, '.env.test') });

  const schemaId = `test_${v4()}`;
  global.__SCHEMA__ = schemaId;

  const databaseURL = join(__dirname, 'prisma', `${schemaId}.db`);
  process.env.DATABASE_URL = `file:${databaseURL}`;

  execSync(`${prismaBin} migrate deploy`);

  console.info('Ready test suites. Starting tests...');
};
