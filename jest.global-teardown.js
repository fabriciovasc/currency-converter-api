const { execSync } = require('child_process');
const { join } = require('path');

const rimRafBin = join(__dirname, 'node_modules', '.bin', 'rimraf');

module.exports = () => {
  const schemaId = global.__SCHEMA__;

  console.info(`Deleting schema ${schemaId}`);

  const schemaPaths = [
    join(__dirname, 'prisma', `${schemaId}.db`),
    join(__dirname, 'prisma', `${schemaId}.db-journal`)
  ];

  schemaPaths.forEach((path) => {
    execSync(`${rimRafBin} ${path}`);
  });

  console.info(`Schema ${schemaId} deleted`);
};
