CREATE TABLE "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"school_name" varchar(255) NOT NULL,
	"food_quality_rating" integer NOT NULL,
	"food_taste_rating" integer NOT NULL,
	"portion_size_rating" integer NOT NULL,
	"food_temperature_rating" integer NOT NULL,
	"variety_rating" integer NOT NULL,
	"presentation_rating" integer NOT NULL,
	"hygiene_rating" integer NOT NULL,
	"favorite_item" varchar(255),
	"least_favorite_item" varchar(255),
	"suggestions" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;