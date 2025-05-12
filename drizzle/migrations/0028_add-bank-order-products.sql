CREATE TYPE "public"."bank_order_product_type_enum" AS ENUM('subscription', 'module');--> statement-breakpoint
CREATE TABLE "bank_order_products" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bank_order_id" text NOT NULL,
	"product_type" "bank_order_product_type_enum" NOT NULL,
	"subscription_tier_id" text,
	"module_id" text
);
--> statement-breakpoint
ALTER TABLE "bank_orders" DROP CONSTRAINT "bank_orders_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "bank_order_products" ADD CONSTRAINT "bank_order_products_bank_order_id_bank_orders_id_fk" FOREIGN KEY ("bank_order_id") REFERENCES "public"."bank_orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bank_order_products" ADD CONSTRAINT "bank_order_products_subscription_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("subscription_tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "bank_order_products" ADD CONSTRAINT "bank_order_products_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "bank_orders" ADD CONSTRAINT "bank_orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE cascade;