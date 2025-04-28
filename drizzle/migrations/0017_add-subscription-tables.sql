CREATE TABLE "subscription_perks" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier_id" text NOT NULL,
	"content" text
);
--> statement-breakpoint
CREATE TABLE "subscription_tiers" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "subscription_tier_enum" NOT NULL,
	"title" text NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "tier_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_perks" ADD CONSTRAINT "subscription_perks_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP COLUMN "subscription_tier";