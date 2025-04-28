ALTER TABLE "subscription_tiers" ADD COLUMN "order_number" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "public"."subscription_tiers" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."subscription_tier_enum";--> statement-breakpoint
CREATE TYPE "public"."subscription_tier_enum" AS ENUM('monthly', '3-month', '6-month', 'lifetime');--> statement-breakpoint
ALTER TABLE "public"."subscription_tiers" ALTER COLUMN "type" SET DATA TYPE "public"."subscription_tier_enum" USING "type"::"public"."subscription_tier_enum";