CREATE TYPE "public"."user_specific_meeting_type_enum" AS ENUM('sales-meeting');--> statement-breakpoint
ALTER TABLE "user_specific_meetings" ADD COLUMN "type" "user_specific_meeting_type_enum";