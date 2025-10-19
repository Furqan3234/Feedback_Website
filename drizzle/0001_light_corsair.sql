ALTER TABLE "feedbacks" RENAME COLUMN "user_id" TO "user_email";--> statement-breakpoint
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_user_id_users_id_fk";
