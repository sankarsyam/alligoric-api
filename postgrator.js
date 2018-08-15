if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line import/no-extraneous-dependencies, global-require
}
if (process.env.NODE_ENV === 'test') {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
}
if (!process.env.MIGRATE_TO) {
  process.env.MIGRATE_TO = 'max';
}

const path = require('path');
// const postgrator = require('postgrator');

// postgrator.setConfig({
//   migrationDirectory: path.join(__dirname, '/migrations'),
//   driver: 'pg',
//   connectionString: process.env.DATABASE_URL,
// });

const Postgrator = require('postgrator');

const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: path.join(__dirname, '/migrations'),
  // or a glob pattern to files
  // migrationPattern: __dirname + '/some/pattern/*',
  // Driver: must be pg, mysql, or mssql
  driver: 'pg',
  // Database connection config
  connectionString: process.env.DATABASE_URL,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  // schemaTable: 'schemaversion'
});

// migrate to version specified, or supply 'max' to go all the way up
// postgrator.migrate(process.env.MIGRATE_TO, (err, migrations) => {
//   /* eslint-disable no-console */
//   if (err) {
//     console.log(err);
//   } else if (migrations) {
//     console.log(['*******************']
//       .concat(migrations.map(migration => `checking ${migration.filename}`))
//       .join('\n'));
//   }
//   /* eslint-enable no-console */
//   postgrator.endConnection(() => { });
// });

// Migrate to specific version
postgrator
  .migrate(process.env.MIGRATE_TO)
  // eslint-disable-next-line no-console
  .then(appliedMigrations => console.log(['*******************']
    .concat(appliedMigrations.map(migration => `checking ${migration.filename}`))
    .join('\n')))
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
    // Because migrations prior to the migration with error would have run
    // error object is decorated with appliedMigrations
    // eslint-disable-next-line no-console
    console.log(error.appliedMigrations); // array of migration objects
  });
