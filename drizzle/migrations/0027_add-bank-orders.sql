CREATE TYPE "public"."bank_order_enum" AS ENUM('failed', 'pending', 'success');--> statement-breakpoint
CREATE TABLE "bank_orders" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"status" "bank_order_enum" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bank_orders" ADD CONSTRAINT "bank_orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;