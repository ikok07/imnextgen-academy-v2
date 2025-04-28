ALTER TABLE "subscription_perks" DROP CONSTRAINT "subscription_perks_tier_id_subscription_tiers_id_fk";
--> statement-breakpoint
ALTER TABLE "user_subscriptions" DROP CONSTRAINT "user_subscriptions_tier_id_subscription_tiers_id_fk";
--> statement-breakpoint
ALTER TABLE "subscription_perks" ADD CONSTRAINT "subscription_perks_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE cascade ON UPDATE cascade;