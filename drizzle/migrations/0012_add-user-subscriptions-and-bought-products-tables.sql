CREATE TYPE "public"."module_access_enum" AS ENUM('free', 'subscription', 'paid', 'private');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier_enum" AS ENUM('inactive', 'monthly', '3-month', '6-month', 'lifetime');--> statement-breakpoint
CREATE TABLE "user_bought_modules" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"module_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"subscription_tier" "subscription_tier_enum" NOT NULL
);
--> statement-breakpoint
-- Step 1: Remove the default constraint
ALTER TABLE "modules" ALTER COLUMN "access" DROP DEFAULT;
-- Step 2: Change the column type with the casting
ALTER TABLE "modules" ALTER COLUMN "access" SET DATA TYPE module_access_enum USING access::text::module_access_enum;
-- Step 3: Add the default constraint back with the new type
ALTER TABLE "modules" ALTER COLUMN "access" SET DEFAULT 'free'::module_access_enum;

ALTER TABLE "user_bought_modules" ADD CONSTRAINT "user_bought_modules_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_bought_modules" ADD CONSTRAINT "user_bought_modules_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "access";--> statement-breakpoint
DROP TYPE "public"."profile_access";