ALTER TABLE "bank_order_products" DROP CONSTRAINT "bank_order_products_subscription_tier_id_subscription_tiers_id_fk";
--> statement-breakpoint
ALTER TABLE "bank_order_products" DROP CONSTRAINT "bank_order_products_module_id_modules_id_fk";
--> statement-breakpoint
ALTER TABLE "bank_order_products" ADD COLUMN "product_id" text;--> statement-breakpoint
ALTER TABLE "bank_order_products" DROP COLUMN "product_type";--> statement-breakpoint
ALTER TABLE "bank_order_products" DROP COLUMN "subscription_tier_id";--> statement-breakpoint
ALTER TABLE "bank_order_products" DROP COLUMN "module_id";--> statement-breakpoint
DROP TYPE "public"."bank_order_product_type_enum";