CREATE TYPE "public"."user_roles_enum" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "user_roles_enum" NOT NULL,
	"profile_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;