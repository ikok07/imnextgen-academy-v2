CREATE TABLE "meeting_signed_up_users" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"meeting_id" text NOT NULL,
	"meeting_start_date" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meeting_signed_up_users" ADD CONSTRAINT "meeting_signed_up_users_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_signed_up_users" ADD CONSTRAINT "meeting_signed_up_users_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_phone_unique" UNIQUE("phone");