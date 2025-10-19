ALTER TABLE "feedbacks" ALTER COLUMN "user_email" TYPE varchar(255);

-- Ensure no foreign key constraint exists referencing users.id on this column
-- If a FK exists, it should be dropped by earlier migration; this is a safe idempotent change in most setups.
