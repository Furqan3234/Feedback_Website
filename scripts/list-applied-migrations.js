const postgres = require('postgres');
(async()=>{
  const sql = postgres(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/feedback_system');
  const r = await sql`SELECT id, name, checksum, created_at FROM __drizzle_migrations ORDER BY id`;
  console.log(JSON.stringify(r, null, 2));
  await sql.end();
})().catch(e=>{console.error(e);process.exit(1)});
