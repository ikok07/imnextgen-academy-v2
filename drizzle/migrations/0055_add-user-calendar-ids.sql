CREATE TABLE "user_calendar_ids" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"calendar_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_calendar_ids" ADD CONSTRAINT "user_calendar_ids_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;