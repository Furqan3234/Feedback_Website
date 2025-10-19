const postgres = require('postgres');
(async()=>{
  const sql = postgres(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/feedback_system');
  try {
    console.log('Running ALTER TABLE to change user_email type...');
    await sql`ALTER TABLE "feedbacks" ALTER COLUMN "user_email" TYPE varchar(255) USING user_email::varchar`;
    console.log('ALTER TABLE completed');
    const r = await sql`SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name='feedbacks' AND column_name='user_email'`;
    console.log('Column info after ALTER:', r);
  } catch (e) {
    console.error('ALTER failed:', e);
    process.exit(1);
  } finally {
    await sql.end();
  }
})().catch(e=>{console.error(e);process.exit(1)});
