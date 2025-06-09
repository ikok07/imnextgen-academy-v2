CREATE TABLE "user_specific_meetings" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"date" integer NOT NULL,
	"duration_minutes" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_specific_meetings" ADD CONSTRAINT "user_specific_meetings_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;