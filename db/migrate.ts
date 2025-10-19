import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runMigration = async () => {
  const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/feedback_system';
  
  const migrationClient = postgres(connectionString, { max: 1 });
  
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './drizzle',
  });

  await migrationClient.end();
  
  console.log('Migration completed successfully!');
};

runMigration().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
