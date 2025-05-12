ALTER TABLE "bank_order_products" DROP CONSTRAINT "bank_order_products_bank_order_id_bank_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "bank_order_products" ADD CONSTRAINT "bank_order_products_bank_order_id_bank_orders_id_fk" FOREIGN KEY ("bank_order_id") REFERENCES "public"."bank_orders"("id") ON DELETE cascade ON UPDATE cascade;