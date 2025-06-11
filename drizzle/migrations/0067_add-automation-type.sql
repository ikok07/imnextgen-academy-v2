CREATE TYPE "public"."automation_type_enum" AS ENUM('sales-meeting-booked');--> statement-breakpoint
ALTER TABLE "automations" ADD COLUMN "type" "automation_type_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "automations" ADD CONSTRAINT "automations_type_unique" UNIQUE("type");