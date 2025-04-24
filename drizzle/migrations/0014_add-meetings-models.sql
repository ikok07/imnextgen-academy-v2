CREATE TYPE "public"."meeting_access_enum" AS ENUM('free', 'premium');--> statement-breakpoint
CREATE TYPE "public"."meeting_platform_enum" AS ENUM('zoom');--> statement-breakpoint
CREATE TABLE "meeting_dates" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meeting_id" text NOT NULL,
	"start_date" integer NOT NULL,
	"end_date" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meeting_excluded_dates" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meeting_id" text NOT NULL,
	"start_date" integer NOT NULL,
	"end_date" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meeting_repeat_days" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meeting_id" text NOT NULL,
	"day_ow_week" integer NOT NULL,
	"start_hour_uts" integer NOT NULL,
	"duration_minutes" integer NOT NULL,
	"valid_until" integer
);
--> statement-breakpoint
CREATE TABLE "meetings" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"access" "meeting_access_enum" DEFAULT 'free' NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"platform" "meeting_platform_enum" DEFAULT 'zoom' NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meeting_dates" ADD CONSTRAINT "meeting_dates_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "meeting_excluded_dates" ADD CONSTRAINT "meeting_excluded_dates_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "meeting_repeat_days" ADD CONSTRAINT "meeting_repeat_days_meeting_id_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meetings"("id") ON DELETE cascade ON UPDATE cascade;