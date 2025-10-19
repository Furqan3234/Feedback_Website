const postgres = require('postgres');
(async()=>{
  const sql = postgres(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/feedback_system');
  const r = await sql`SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name='feedbacks' AND column_name='user_email'`;
  console.log(r);
  await sql.end();
})().catch(e=>{console.error(e);process.exit(1)});
