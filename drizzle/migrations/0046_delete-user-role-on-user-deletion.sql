ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;