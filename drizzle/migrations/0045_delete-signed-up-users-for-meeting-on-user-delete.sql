ALTER TABLE "meeting_signed_up_users" DROP CONSTRAINT "meeting_signed_up_users_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "meeting_signed_up_users" ADD CONSTRAINT "meeting_signed_up_users_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;