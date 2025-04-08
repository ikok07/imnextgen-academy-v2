CREATE TYPE "public"."profile_access" AS ENUM('free', 'subscription', 'paid');--> statement-breakpoint
CREATE TABLE "new_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"configured" boolean DEFAULT false NOT NULL,
	"image_url" text,
	"access" "profile_access" DEFAULT 'free' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "new_profiles" ADD CONSTRAINT "new_profiles_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;