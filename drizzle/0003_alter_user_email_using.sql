-- Convert integer user_email column to varchar safely
ALTER TABLE "feedbacks" ALTER COLUMN "user_email" TYPE varchar(255) USING user_email::varchar;
